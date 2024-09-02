import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

import pickle

main_data=pd.read_csv('EL_FINAL_HOSPITAL_DATA.csv')

main_data['hour_of_day'] = pd.to_datetime(main_data['Arrival Time']).dt.hour
day_of_week_encoder = LabelEncoder()
disease_encoder = LabelEncoder()

main_data['day_of_week_encoded'] = day_of_week_encoder.fit_transform(main_data['Day of the Week'])
main_data['Disease_encoded'] = disease_encoder.fit_transform(main_data['Disease'])

numerical_features = ['Distance from AIIMS Bhubaneswar',
                      'Distance from IGKC Multispeciality hospital',
                      'Distance from SUM Ultimate',
                      'Distance from ApolloMedicare']
scaler = StandardScaler()
main_data[numerical_features] = scaler.fit_transform(main_data[numerical_features])

X = main_data[['hour_of_day', 'day_of_week_encoded', 'Disease_encoded'] + numerical_features]
y_hospital = main_data['Hospital']
y_ward = main_data['Ward Visited']

X_train_hospital, X_test_hospital, y_train_hospital, y_test_hospital = train_test_split(X, y_hospital, test_size=0.2, random_state=42)
X_train_ward, X_test_ward, y_train_ward, y_test_ward = train_test_split(X, y_ward, test_size=0.2, random_state=42)

hospital_model = RandomForestClassifier(n_estimators=100, random_state=42)
hospital_model.fit(X_train_hospital, y_train_hospital)
y_pred_hospital = hospital_model.predict(X_test_hospital)
# print("Hospital Prediction Accuracy:", accuracy_score(y_test_hospital, y_pred_hospital))


ward_model = RandomForestClassifier(n_estimators=100, random_state=42)
ward_model.fit(X_train_ward, y_train_ward)
y_pred_ward = ward_model.predict(X_test_ward)
# print("Ward Prediction Accuracy:", accuracy_score(y_test_ward, y_pred_ward))

def prepare_input_data(input_data, day_of_week_encoder, disease_encoder, scaler):
    input_df = pd.DataFrame([input_data])
    input_df['day_of_week_encoded'] = day_of_week_encoder.transform([input_df['day_of_week'].values[0]])[0]
    input_df['Disease_encoded'] = disease_encoder.transform([input_df['Disease'].values[0]])[0]
    input_df[numerical_features] = scaler.transform(input_df[numerical_features])
    return input_df[['hour_of_day', 'day_of_week_encoded', 'Disease_encoded'] + numerical_features]

def recommend_hospital_and_ward(input_data):
    if input_data['Disease'].lower() == 'emergency':
        distances = {
            'AIIMS Bhubaneswar': input_data['Distance from AIIMS Bhubaneswar'],
            'IGKC Multispeciality hospital': input_data['Distance from IGKC Multispeciality hospital'],
            'SUM Ultimate': input_data['Distance from SUM Ultimate'],
            'ApolloMedicare': input_data['Distance from ApolloMedicare']
        }
        nearest_hospital = min(distances, key=distances.get)
        return nearest_hospital, 'Emergency Ward'
    else:
        input_df = prepare_input_data(input_data, day_of_week_encoder, disease_encoder, scaler)
        predicted_hospital = hospital_model.predict(input_df)[0]
        predicted_ward = ward_model.predict(input_df)[0]
        return predicted_hospital, predicted_ward

pickle.dump(scaler, open('hospital_recommendation.pkl', "wb"))