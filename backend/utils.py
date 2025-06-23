import re
import string
import os
import random

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

def predict_phishing(email_content):
    """Predict if an email is phishing using rule-based approach"""
    # Preprocess the email
    cleaned_text = preprocess_email(email_content)
    
    # Extract flags
    flags = extract_flags(email_content)
    
    # Calculate a phishing score based on the number of flags
    phishing_score = len(flags) * 20  # Each flag adds 20% to the phishing score
    
    # Add additional scoring based on common phishing indicators
    lower_email = email_content.lower()
    
    # Check for urgent language
    urgent_phrases = ['urgent', 'immediate action', 'account suspended', 'verify your account',
                     'security alert', 'unusual activity', 'problem with your account']
    for phrase in urgent_phrases:
        if phrase in lower_email:
            phishing_score += 10
    
    # Check for suspicious URLs
    if re.search(r'https?://\d+\.\d+\.\d+\.\d+', lower_email):
        phishing_score += 30  # IP address in URL is highly suspicious
    
    # Check for domain mismatches
    if 'paypal' in lower_email and re.search(r'https?://(?!.*paypal\.com)', lower_email):
        phishing_score += 25
    if 'amazon' in lower_email and re.search(r'https?://(?!.*amazon\.com)', lower_email):
        phishing_score += 25
    if 'microsoft' in lower_email and re.search(r'https?://(?!.*microsoft\.com)', lower_email):
        phishing_score += 25
    
    # Check for requests for sensitive information
    sensitive_info = ['password', 'credit card', 'social security', 'ssn', 'bank account',
                     'username and password', 'login details']
    for info in sensitive_info:
        if info in lower_email:
            phishing_score += 15
    
    # Cap the score at 100%
    phishing_score = min(phishing_score, 100)
    
    # Add some randomness to simulate ML model behavior (±5%)
    phishing_score = min(100, max(0, phishing_score + random.uniform(-5, 5)))
    
    # Determine verdict based on score threshold
    is_phishing = phishing_score > 50
    
    return {
        "verdict": "phishing" if is_phishing else "legitimate",
        "confidence": round(phishing_score if is_phishing else (100 - phishing_score), 2),
        "flags": flags
    }
