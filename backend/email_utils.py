import re
import string
import os
import random
import hashlib

def preprocess_email(email_content):
    """Clean and preprocess email content"""
    # Convert to lowercase
    text = email_content.lower()
    
    # Remove URLs
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    
    # Remove HTML tags
    text = re.sub(r'<.*?>', '', text)
    
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def extract_flags(email_content):
    """Extract potential phishing flags from email content"""
    flags = []
    
    # Check for urgent language
    urgent_words = ['urgent', 'immediately', 'alert', 'verify', 'suspended', 'restricted']
    if any(word in email_content.lower() for word in urgent_words):
        flags.append("Contains urgent language")
    
    # Check for suspicious URLs
    urls = re.findall(r'https?://\S+|www\.\S+', email_content)
    if urls:
        for url in urls:
            # Check for misleading domains
            if 'paypal' in email_content.lower() and 'paypal' not in url.lower():
                flags.append("Contains URL with potential domain mismatch")
            # Check for IP addresses in URLs
            if re.search(r'https?://\d+\.\d+\.\d+\.\d+', url):
                flags.append("Contains URL with IP address")
    
    # Check for requests for personal information
    info_words = ['password', 'credit card', 'social security', 'bank account', 'login', 'verify your account']
    if any(word in email_content.lower() for word in info_words):
        flags.append("Requests personal information")
    
    # Check for suspicious attachments
    attachment_patterns = [r'\.exe', r'\.zip', r'\.rar', r'\.js', r'\.vbs']
    if any(re.search(pattern, email_content.lower()) for pattern in attachment_patterns):
        flags.append("References suspicious attachment types")
    
    return flags

def _simulate_lstm_prediction(text):
    """
    Simulate LSTM model prediction based on text features
    This is a placeholder for the actual LSTM model that would use TensorFlow
    
    In a real implementation, this would:
    1. Use the tokenizer to convert text to sequences
    2. Pad the sequences to a fixed length
    3. Pass the padded sequences to the LSTM model
    4. Return the prediction probability
    """
    # Use deterministic features from the text to simulate consistent predictions
    # This is just for demonstration - in reality, we would use the actual LSTM model
    
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

def predict_phishing(email_content):
    """Predict if an email is phishing using a simulated LSTM model"""
    # Preprocess the email
    cleaned_text = preprocess_email(email_content)
    
    # Extract flags for additional context
    flags = extract_flags(email_content)
    
    # Get prediction from simulated LSTM model
    prediction = _simulate_lstm_prediction(cleaned_text)
    
    # Convert prediction to percentage
    phishing_score = float(prediction) * 100
    
    # Determine verdict based on threshold (0.5 or 50%)
    is_phishing = phishing_score > 50
    
    # Print debug info (would be removed in production)
    print(f"[DEBUG] Prediction: {prediction:.4f}, Score: {phishing_score:.2f}%, Verdict: {'phishing' if is_phishing else 'legitimate'}")
    
    return {
        "verdict": "phishing" if is_phishing else "legitimate",
        "confidence": round(phishing_score if is_phishing else (100 - phishing_score), 2),
        "flags": flags
    }
