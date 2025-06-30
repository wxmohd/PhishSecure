from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re

# Import directly from email_utils for domain-based analysis
from email_utils import predict_phishing, extract_flags

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
        email_address = data.get("email")
        
        # Check if we have an email address
        if not email_address:
            return jsonify({"error": "No email address provided"}), 400
            
        # Ensure the input is formatted as an email address if it's not already
        if '@' not in email_address:
            return jsonify({"error": "Invalid email format. Must include @ symbol"}), 400

        # Use the predict_phishing function directly for domain-based analysis
        result = predict_phishing(email_address)
        
        return jsonify({
            "verdict": result["verdict"],
            "confidence": result["confidence"],
            "flags": result["flags"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
