import os
import re
import string
import pickle
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Global variables to store loaded model and tokenizer
_model = None
_tokenizer = None
_max_sequence_length = 100  # Default value, will be determined by model input shape

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

def load_model_and_tokenizer():
    """Load the LSTM model and tokenizer from files"""
    global _model, _tokenizer, _max_sequence_length
    
    if _model is None:
        # Navigate to the model directory relative to this file
        model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model', 'phishing_lstm_model.h5')
        _model = load_model(model_path)
        # Get the input shape from the model to determine the sequence length
        _max_sequence_length = _model.input_shape[1]
    
    if _tokenizer is None:
        tokenizer_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model', 'tokenizer.pickle')
        with open(tokenizer_path, 'rb') as handle:
            _tokenizer = pickle.load(handle)
    
    return _model, _tokenizer

def predict(email_text):
    """Predict if an email is phishing using the LSTM model"""
    # Preprocess the email text
    cleaned_text = preprocess_text(email_text)
    
    # Load model and tokenizer
    model, tokenizer = load_model_and_tokenizer()
    
    # Tokenize the text
    sequences = tokenizer.texts_to_sequences([cleaned_text])
    
    # Pad the sequences to a fixed length
    padded_sequences = pad_sequences(sequences, maxlen=_max_sequence_length)
    
    # Make prediction
    prediction = model.predict(padded_sequences, verbose=0)[0][0]
    
    # Convert prediction to probability
    probability = float(prediction)
    
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
