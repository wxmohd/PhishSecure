import re
import string
import os
import pickle
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

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

# Global variables to store loaded model and tokenizer
_model = None
_tokenizer = None
_max_sequence_length = 100  # Default value, will be determined by model input shape

def _load_model_and_tokenizer():
    """Load the LSTM model and tokenizer from files"""
    global _model, _tokenizer, _max_sequence_length
    
    if _model is None:
        model_path = os.path.join(os.path.dirname(__file__), 'model', 'phishing_lstm_model.h5')
        _model = load_model(model_path)
        # Get the input shape from the model to determine the sequence length
        _max_sequence_length = _model.input_shape[1]
    
    if _tokenizer is None:
        tokenizer_path = os.path.join(os.path.dirname(__file__), 'model', 'tokenizer.pickle')
        with open(tokenizer_path, 'rb') as handle:
            _tokenizer = pickle.load(handle)
    
    return _model, _tokenizer

def predict_phishing(email_content):
    """Predict if an email is phishing using the pre-trained LSTM model"""
    # Preprocess the email
    cleaned_text = preprocess_email(email_content)
    
    # Extract flags for additional context (not used in prediction)
    flags = extract_flags(email_content)
    
    # Load the model and tokenizer
    model, tokenizer = _load_model_and_tokenizer()
    
    # Tokenize the text
    sequences = tokenizer.texts_to_sequences([cleaned_text])
    
    # Pad the sequences to a fixed length
    padded_sequences = pad_sequences(sequences, maxlen=_max_sequence_length)
    
    # Make prediction
    prediction = model.predict(padded_sequences, verbose=0)[0][0]
    
    # Convert prediction to percentage
    phishing_score = float(prediction) * 100
    
    # Determine verdict based on threshold (0.5 or 50%)
    is_phishing = phishing_score > 50
    
    return {
        "verdict": "phishing" if is_phishing else "legitimate",
        "confidence": round(phishing_score if is_phishing else (100 - phishing_score), 2),
        "flags": flags
    }
