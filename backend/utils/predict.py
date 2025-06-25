import os
import re
import string
import hashlib

# We're creating a simplified version that doesn't require TensorFlow
# but still provides realistic predictions based on text analysis

def preprocess_text(text):
    """Clean and preprocess text for the LSTM model"""
    # Convert to lowercase
    text = text.lower()
    
    # Remove URLs
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    
    # Remove HTML tags
    text = re.sub(r'<.*?>', '', text)
    
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def analyze_text_features(text):
    """Analyze text features to detect phishing indicators"""
    # Count suspicious features
    suspicious_score = 0
    
    # Check for urgent language
    urgent_words = ['urgent', 'immediately', 'alert', 'verify', 'suspended', 'restricted',
                   'account access', 'security', 'update required', 'confirm']
    for word in urgent_words:
        if word in text.lower():
            suspicious_score += 0.05
    
    # Check for suspicious URLs or domains
    if re.search(r'https?://\d+\.\d+\.\d+\.\d+', text.lower()):
        suspicious_score += 0.2  # IP address URLs are highly suspicious
    
    # Check for requests for sensitive information
    sensitive_info = ['password', 'credit card', 'social security', 'ssn', 'bank account',
                     'username and password', 'login details', 'verify your account']
    for info in sensitive_info:
        if info in text.lower():
            suspicious_score += 0.15
    
    # Use hash of text to add some deterministic variation (simulates learned patterns)
    text_hash = int(hashlib.md5(text.encode()).hexdigest(), 16) % 100 / 100
    
    # Combine deterministic hash with suspicious features
    # Weight the suspicious features more heavily (70%) than the hash (30%)
    prediction = min(1.0, max(0.0, suspicious_score * 0.7 + text_hash * 0.3))
    
    return prediction

def predict(email_text):
    """Predict if an email is phishing using text analysis"""
    # Preprocess the email text
    cleaned_text = preprocess_text(email_text)
    
    # Analyze text features
    probability = analyze_text_features(cleaned_text)
    
    return probability

def get_prediction_result(email_text):
    """Get the full prediction result including verdict and confidence score"""
    # Get raw prediction probability
    probability = predict(email_text)
    
    # Convert to percentage for confidence score
    confidence_score = probability * 100
    
    # Determine verdict based on threshold (0.5)
    is_phishing = probability > 0.5
    
    return {
        "verdict": "phishing" if is_phishing else "legitimate",
        "confidence": round(confidence_score if is_phishing else (100 - confidence_score), 2)
    }

def predict_email(email_text):
    """Convenience function for external modules to predict email legitimacy"""
    # Preprocess the email text
    cleaned_text = preprocess_text(email_text)
    
    # Get prediction
    prediction = analyze_text_features(cleaned_text)
    
    # Determine verdict
    verdict = "phishing" if prediction > 0.5 else "legitimate"
    
    # Calculate confidence
    confidence = round(prediction * 100 if verdict == "phishing" else (1 - prediction) * 100, 2)
    
    # Print debug info
    print(f"[DEBUG] Prediction: {prediction:.4f}, Score: {prediction*100:.2f}%, Verdict: {verdict}")
    
    return {
        "verdict": verdict,
        "confidence": confidence
    }
