from flask import Flask, request, jsonify
import pickle
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Allow CORS for the Spring Boot backend and Angular frontend

# Load the model
try:
    with open('car_price_model.pkl', 'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    model = None

# Brand Mapping
BRAND_MAP = {
    'Hyundai': 0,
    'Maruti Suzuki': 1,
    'Toyota': 2,
    'Honda': 3,
    'Tata': 4
}

# Fuel Mapping
FUEL_MAP = {
    'Petrol': 0,
    'Diesel': 1,
    'Electric': 2
}

@app.route('/predict-price', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not trained yet'}), 500

    data = request.get_json()
    
    try:
        brand_val = BRAND_MAP.get(data.get('brand'), 0)
        year = int(data.get('year'))
        mileage = int(data.get('mileage'))
        fuel_val = FUEL_MAP.get(data.get('fuel_type'), 0)

        # Prepare input for prediction
        input_data = np.array([[brand_val, year, mileage, fuel_val]])
        prediction = model.predict(input_data)[0]

        # Basic rounding and ensuring price isn't negative
        predicted_price = max(0, int(round(prediction)))

        return jsonify({
            'predicted_price': predicted_price,
            'currency': 'INR'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'AI Service is running!'})

if __name__ == '__main__':
    # Listen on 0.0.0.0 to allow external connections (required for Render)
    app.run(host='0.0.0.0', port=5000, debug=True)
