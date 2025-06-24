from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# Import from email_utils.py file directly
from email_utils import preprocess_email, extract_flags, predict_phishing

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

        # Use the predict_phishing function from utils
        result = predict_phishing(email_content)

        return jsonify({
            "verdict": result["verdict"],
            "confidence": round(result["confidence"], 2),
            "flags": result["flags"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
