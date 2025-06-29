"""
Prediction module for PhishSecure email analysis
"""
# Import the prediction function from email_utils
from email_utils import predict_phishing

def predict_email(email_content):
    """
    Predict whether an email is phishing or legitimate
    
    Args:
        email_content (str): The raw email content to analyze
        
    Returns:
        dict: A dictionary containing the verdict and confidence score
    """
    # Use the existing predict_phishing function from email_utils
    return predict_phishing(email_content)
