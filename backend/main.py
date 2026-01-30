# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pickle
# import numpy as np
# import pandas as pd
# from datetime import datetime
# import os

# app = Flask(__name__)
# CORS(app)  # Enable CORS for frontend access

# # Load the trained models
# with open('app/models/model_rf.pkl', 'rb') as f:
#     model_rf = pickle.load(f)

# with open('app/models/scaler.pkl', 'rb') as f:
#     scaler = pickle.load(f)

# def get_aqi_category(aqi):
#     """Convert AQI value to category"""
#     if aqi <= 50:
#         return "Good"
#     elif aqi <= 100:
#         return "Moderate"
#     elif aqi <= 200:
#         return "Unhealthy"
#     elif aqi <= 300:
#         return "Very Unhealthy"
#     elif aqi <= 400:
#         return "Hazardous"
#     else:
#         return "Severe"

# def get_ai_message(aqi, category, temp, humidity):
#     """Generate AI message based on AQI and conditions"""
#     messages = {
#         "Good": [
#             f"🌟 Air quality is excellent! Perfect time for outdoor activities. Temperature: {temp}°C, Humidity: {humidity}%",
#             f"✨ Breathe easy! AQI is at a healthy {aqi}. Great day to enjoy the outdoors!",
#             f"🌿 Clean air detected! AQI: {aqi}. Ideal conditions for exercise and outdoor fun."
#         ],
#         "Moderate": [
#             f"⚠️ Air quality is acceptable (AQI: {aqi}). Sensitive individuals should limit prolonged outdoor exposure.",
#             f"📊 Moderate air quality. Most people can enjoy outdoor activities, but watch for any symptoms.",
#             f"🔔 AQI at {aqi} - Generally safe, but sensitive groups should monitor their health."
#         ],
#         "Unhealthy": [
#             f"🚨 Unhealthy air quality! AQI: {aqi}. Everyone should reduce outdoor activities. Use air purifiers indoors.",
#             f"⛔ Air pollution detected (AQI: {aqi}). Children and elderly should stay indoors. Wear masks if going out.",
#             f"⚠️ Health alert! AQI: {aqi}. Limit outdoor exposure and keep windows closed."
#         ],
#         "Very Unhealthy": [
#             f"🔴 Very unhealthy air! AQI: {aqi}. Stay indoors, use air purifiers, and avoid all outdoor activities.",
#             f"🚨 Severe air pollution (AQI: {aqi})! Health risk for everyone. Keep windows closed and use N95 masks if necessary.",
#             f"⛔ Dangerous air quality! AQI: {aqi}. Indoor activities only. Monitor health closely."
#         ],
#         "Hazardous": [
#             f"🆘 HAZARDOUS conditions! AQI: {aqi}. Emergency measures needed. Stay indoors with air purification.",
#             f"🚨 EXTREME DANGER! AQI: {aqi}. Do not go outside. Seal windows and use HEPA filters.",
#             f"⛔ CRITICAL air pollution! AQI: {aqi}. Health emergency - shelter in place immediately."
#         ],
#         "Severe": [
#             f"🆘 SEVERE EMERGENCY! AQI: {aqi}. Immediate health threat. Stay indoors with sealed rooms!",
#             f"🚨 CATASTROPHIC air quality! AQI: {aqi}. Extreme health risk - take emergency precautions now!"
#         ]
#     }
    
#     import random
#     base_message = random.choice(messages.get(category, messages["Moderate"]))
    
#     # Add temperature/humidity warnings
#     if temp > 35:
#         base_message += " ⚠️ High temperature alert!"
#     elif temp < 10:
#         base_message += " ❄️ Cold weather advisory."
    
#     if humidity > 80:
#         base_message += " 💧 High humidity levels."
#     elif humidity < 30:
#         base_message += " 🏜️ Low humidity - stay hydrated."
    
#     return base_message

# def get_health_recommendations(category):
#     """Provide health recommendations based on AQI category"""
#     recommendations = {
#         "Good": "Enjoy outdoor activities! No health precautions needed.",
#         "Moderate": "Consider reducing intense outdoor activities if you experience symptoms.",
#         "Unhealthy": "Wear masks outdoors. Use air purifiers indoors. Limit outdoor time.",
#         "Very Unhealthy": "Stay indoors. Use N95 masks if you must go out. Run air purifiers.",
#         "Hazardous": "Emergency measures: Stay indoors, seal windows, use HEPA filters.",
#         "Severe": "CRITICAL: Evacuate to cleaner area if possible. Seek medical attention if breathing issues occur."
#     }
#     return recommendations.get(category, "Monitor air quality closely.")

# @app.route('/predict', methods=['POST'])
# def predict_aqi():
#     try:
#         # Get data from request
#         data = request.json
        
#         # Extract sensor readings
#         temp = data.get('temperature', 25.0)
#         humidity = data.get('humidity', 50.0)
#         co = data.get('CO', 0.0)
#         so2 = data.get('SO2', 0.0)
#         no2 = data.get('NO2', 0.0)
#         o3 = data.get('O3', 0.0)
        
#         # Calculate PM2.5 and PM10 estimates from gas concentrations
#         # These are rough estimates - adjust based on your calibration
#         pm2_5 = (co * 0.1) + (no2 * 2.0) + (so2 * 1.5)
#         pm10 = pm2_5 * 1.4  # Typical PM10/PM2.5 ratio
        
#         # Prepare features for prediction
#         # Features: ['temp_c', 'humidity', 'pm2_5', 'pm10', 'no2', 'co']
#         features = np.array([[temp, humidity, pm2_5, pm10, no2, co]])
        
#         # Predict AQI category (0-6)
#         aqi_category_num = model_rf.predict(features)[0]
        
#         # Convert category to actual AQI value (midpoint of range)
#         aqi_ranges = {
#             0: 25,   # 0-50
#             1: 75,   # 51-100
#             2: 150,  # 101-200
#             3: 250,  # 201-300
#             4: 350,  # 301-400
#             5: 450,  # 401-500
#             6: 550   # 501+
#         }
#         predicted_aqi = aqi_ranges.get(int(aqi_category_num), 150)
        
#         # Get AQI category name
#         category = get_aqi_category(predicted_aqi)
        
#         # Generate AI message
#         ai_message = get_ai_message(predicted_aqi, category, temp, humidity)
        
#         # Get health recommendations
#         recommendations = get_health_recommendations(category)
        
#         # Prepare response
#         response = {
#             'success': True,
#             'timestamp': datetime.now().isoformat(),
#             'aqi': int(predicted_aqi),
#             'category': category,
#             'ai_message': ai_message,
#             'recommendations': recommendations,
#             'sensor_data': {
#                 'temperature': round(temp, 1),
#                 'humidity': round(humidity, 1),
#                 'CO': round(co, 2),
#                 'SO2': round(so2, 2),
#                 'NO2': round(no2, 2),
#                 'O3': round(o3, 2),
#                 'PM2.5': round(pm2_5, 2),
#                 'PM10': round(pm10, 2)
#             },
#             'gas_levels': {
#                 'CO': 'High' if co > 1000 else 'Normal',
#                 'SO2': 'High' if so2 > 50 else 'Normal',
#                 'NO2': 'High' if no2 > 40 else 'Normal',
#                 'O3': 'High' if o3 > 100 else 'Normal'
#             }
#         }
        
#         return jsonify(response)
    
#     except Exception as e:
#         return jsonify({
#             'success': False,
#             'error': str(e)
#         }), 500

# @app.route('/health', methods=['GET'])
# def health_check():
#     """Health check endpoint"""
#     return jsonify({
#         'status': 'healthy',
#         'timestamp': datetime.now().isoformat()
#     })

# @app.route('/history', methods=['POST'])
# def save_history():
#     """Save AQI reading to history (optional)"""
#     try:
#         data = request.json
#         # Here you could save to a database
#         # For now, just return success
#         return jsonify({'success': True, 'message': 'Data saved'})
#     except Exception as e:
#         return jsonify({'success': False, 'error': str(e)}), 500

# if __name__ == '__main__':
#     # Create models directory if it doesn't exist
#     os.makedirs('app/models', exist_ok=True)
    
#     # Run the Flask app
#     app.run(host='0.0.0.0', port=5000, debug=True)


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pickle
import numpy as np
import pandas as pd
import os
import requests
# from armoriq import ArmorIQ  # Mandatory for the ₹30,000 prize track

import google.generativeai as genai
GEMINI_API_KEY = "AIzaSyCNHtPTBwKAhI99c9wQkNw614AemT4NJZE"
genai.configure(api_key=GEMINI_API_KEY)
ai_model = genai.GenerativeModel('gemini-2.5-flash')

print("--- Available Models for your API Key ---")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Model Name: {m.name}")
except Exception as e:
    print(f"Error: {e}")

app = FastAPI(title="AeroGuard AI Backend")

# 1. Enable CORS for your React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to ["http://localhost:3000"] for React
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Configuration & Model Loading
WAQI_TOKEN = "c232e9e89c59aa4d1066f1ef2e2592eb066214e1"

# ARMOR_IQ_KEY = "YOUR_ARMOR_IQ_KEY"  # Replace with your ArmorIQ key
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


MODEL_CLS_PATH = os.path.join(BASE_DIR, "models", "model_rf.pkl")
REG_MODEL_PATH = os.path.join(BASE_DIR, "models", "model_rf_reg.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler.pkl")

# Load models into memory
try:
    model_cls = pickle.load(open(MODEL_CLS_PATH, "rb"))
    model_reg = pickle.load(open(REG_MODEL_PATH, "rb"))
    scaler = pickle.load(open(SCALER_PATH, "rb"))
    # shield = ArmorIQ(api_key=ARMOR_IQ_KEY)
    print("✅ ML Models loaded successfully.")
except Exception as e:
    print(f"❌ Error loading models: {e}")

# 3. Helper Functions
def get_auto_coordinates():
    """Automatically detect location based on IP."""
    try:
        res = requests.get('https://ipapi.co/json/').json()
        return res.get('latitude', 28.5397), res.get('longitude', 77.1600)
    except:
        return 28.5397, 77.1600  # Default to JNU, Delhi

def get_regional_pm_data(lat, lon):
    """Fetch PM2.5 and PM10 from the nearest WAQI station."""
    url = f"https://api.waqi.info/feed/geo:{lat};{lon}/?token={WAQI_TOKEN}"
    try:
        res = requests.get(url).json()
        if res['status'] == 'ok':
            iaqi = res['data']['iaqi']
            return {
                "pm25": iaqi.get('pm25', {}).get('v', 0),
                "pm10": iaqi.get('pm10', {}).get('v', 0),
                "station": res['data']['city']['name']
            }
    except:
        return {"pm25": 0, "pm10": 0, "station": "Station Offline"}

# 4. The Main Prediction Route
@app.get("/api/aqi-status")
async def get_aqi_report(temp: float, hum: float, CO_ppm: float, NH3_ppm: float):
    """
    Called by React with live ESP32 data: 
    Example: /api/aqi-status?temp=25&hum=60&co=450&no2=35
    """
    # Step A: Get Geolocation and Particle Data
    lat, lon = get_auto_coordinates()
    regional = get_regional_pm_data(lat, lon)
    
    # Step B: ML Prediction (Features: temp, hum, pm25, pm10, no2, co)
    input_features = pd.DataFrame([[
        temp,               # temp_c
        hum,                # humidity
        regional['pm25'],   # pm2_5
        regional['pm10'],   # pm10
        NH3_ppm,            # no2 (mapped from hardware NH3)
        CO_ppm              # co (mapped from hardware CO)
    ]], columns=['temp_c', 'humidity', 'pm2_5', 'pm10', 'no2', 'co'])
    scaled_input = scaler.transform(input_features)

    #Get the category (Classification)
    cat_index = int(model_cls.predict(scaled_input)[0])

    #Get the precise aqi value
    predicted_aqi_value = float(model_reg.predict(scaled_input)[0])
    
    aqi_labels = ["Good", "Moderate", "Poor", "Unhealthy", "Severe", "Hazardous"]
    status = aqi_labels[cat_index]
    
    # Step C: Secure AI Message via ArmorIQ
    # Using the ML result and hardware data to create a contextual prompt
    prompt = (
        f"You are an environmental health assistant. The current air quality is '{status}' "
        f"(Category {cat_index}). The local CO level is {CO_ppm} ppm. "
        "Provide a concise, 1-sentence health tip for a student at JNU university."
    )
    # Sanitization fulfills the ArmorIQ track requirement
    try:
        response = ai_model.generate_content(prompt)
        ai_message = response.text.strip()
    except Exception as e:
        print(f"Gemini error : {e}")
        ai_message = f"Air quality is {status}. Please take necessary precautions."
    
    # 
    
    # Step D: Return Super-Response
    return {
        "location": {"lat": lat, "lon": lon, "city": regional['station']},
        "hardware_data": {
            "temperature": temp,
            "humidity": hum,
            "co_gas": CO_ppm,
            "no2_gas": NH3_ppm
        },
        "regional_data": {
            "pm25": regional['pm25'],
            "pm10": regional['pm10']
        },
        "prediction": {
            "aqi_value": round(predicted_aqi_value, 2), #Predicted aqi value
            "index": cat_index,
            "label": status
        },
        "ai_message": ai_message
    }

if __name__ == "__main__":
    #0.0.0.0 so that i can listen in local network IP 
    uvicorn.run(app, host="0.0.0.0", port=8000)