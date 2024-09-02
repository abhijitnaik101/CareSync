from flask import Flask, request, jsonify
import json
import pandas as pd
from hospital_recommendation import recommend_hospital_and_ward  # Import your functions
from timeEstimator import waiting_time_calc
import pickle

app = Flask(__name__)

@app.route('/')
def home():
    return "ML Model API is running!"

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    recommended_hospital, recommended_ward = recommend_hospital_and_ward(data)
    return jsonify({
        'hospital': recommended_hospital,
        'ward': recommended_ward
    })

@app.route('/waiting_time', methods=['POST'])
def waiting_time():
    data = request.json
    input_df = pd.DataFrame([data])
    predicted_waiting_time = waiting_time_calc(input_df)
    return jsonify({
        'waiting_time': predicted_waiting_time.round(2)
    })

if __name__ == '__main__':
    app.run(debug=True)
