from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import string
import numpy as np
from utils import preprocess_email, extract_flags

model = joblib.load("phishing_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Init Flask app
app = Flask(__name__)
CORS(app)  

@app.route("/")
def home():
    return "Phishing Email Analyzer API is running."

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        email_content = data.get("content")

        if not email_content:
            return jsonify({"error": "No email content provided"}), 400

        # Preprocess
        cleaned_text = preprocess_email(email_content)
        vectorized = vectorizer.transform([cleaned_text])

        # Predict
        prediction = model.predict(vectorized)[0]
        confidence = model.predict_proba(vectorized)[0][prediction] * 100

        # Flags
        flags = extract_flags(email_content)

        return jsonify({
            "verdict": "phishing" if prediction == 1 else "legitimate",
            "confidence": round(confidence, 2),
            "flags": flags
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
