from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# Import from email_utils.py for flag extraction
from email_utils import extract_flags

# Import the LSTM prediction function
from utils.predict import predict_email

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

        # Use the predict_email function from utils.predict for LSTM analysis
        result = predict_email(email_content)
        
        # Extract flags for additional context
        flags = extract_flags(email_content)

        return jsonify({
            "verdict": result["verdict"],
            "confidence": result["confidence"],
            "flags": flags
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
