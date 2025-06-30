"""
Prediction module for PhishSecure email domain analysis
"""
# Import the prediction function from email_utils
from email_utils import predict_phishing

def predict_email(email_address):
    """
    Predict whether an email is phishing or legitimate based on its domain
    
    Args:
        email_address (str): The email address to analyze
        
    Returns:
        dict: A dictionary containing the verdict and confidence score
    """
    # Use the existing predict_phishing function from email_utils
    return predict_phishing(email_address)
