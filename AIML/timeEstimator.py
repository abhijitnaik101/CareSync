import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import classification_report, accuracy_score, mean_squared_error, mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pickle

# Load data
main_data = pd.read_csv('EL_FINAL_HOSPITAL_DATA.csv')

X = main_data[['Hospital', 'Arrival Time', 'Day of the Week', 'Ward Visited',
               'Number of patients under age 30', 'Number of patients of age 31-50',
               'Number of patients of age 51 and above']]
y = main_data['Waiting Time (mins)']


categorical_features = ['Hospital', 'Arrival Time', 'Day of the Week', 'Ward Visited']
numerical_features = ['Number of patients under age 30', 
                      'Number of patients of age 31-50', 'Number of patients of age 51 and above']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ])

pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=50, random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

pipeline.fit(X_train, y_train)

def waiting_time_calc(input_data):
    return  pipeline.predict(input_data)[0]

# Print results
# print(f"Predicted Waiting Time for Sample Input: {waiting_time_calc.round(2)} minutes")
# print(f"Mean Squared Error: {mean_error:.2f}")
# print(f"Root Mean Squared Error: {root_mean_error:.2f}")

# Save the pipeline to a pickle file
pickle.dump(pipeline,open('timeEstimator.pkl', "wb"))
