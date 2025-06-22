# 📧 Phishing Email Analyzer

A web-based application that uses machine learning to detect phishing emails based on message content and structure. Users can paste an email or upload a `.eml` file, and the system will analyze the text for common phishing indicators and return a risk assessment.

---

## 🚀 Live Demo
🌐 [Visit the app on Vercel]
🔗 [API deployed on Render]

---

## 🧠 Features

- Paste raw email content or upload `.eml` files
- Detect phishing vs legitimate emails using a trained ML model
- Analyze:
  - Suspicious links
  - Spoofed sender domains
  - Urgent or manipulative language
  - Dangerous attachments
- Get a clear verdict + confidence score + key flags

---

## 🛠️ Tech Stack

### 🔍 Backend (Flask API)
- Python 3, Flask
- scikit-learn (ML model)
-- Hosted on **Render**

### 💻 Frontend (Web App)
- Next.js + Tailwind CSS
- File and text input interface
- Consumes the Flask API
- Hosted on **Vercel**

---

## 🧪 How It Works

1. The user inputs email content or uploads a `.eml` file
2. The frontend sends the content to `/analyze` API
3. The model processes the email and returns:
   - `verdict`: `phishing` or `legitimate`
   - `confidence`: e.g. 93%
   - `flags`: e.g. `"Spoofed sender"`, `"Urgent language"`

---

## 📁 Project Structure

phishing-email-analyzer/
├── backend/
│ ├── app.py # Flask API
│ ├── phishing_model.pkl # Trained ML model
│ ├── utils.py # Preprocessing functions
│ └── requirements.txt
├── frontend/
│ ├── pages/
│ │ ├── index.tsx # Input form
│ │ └── result.tsx # Analysis result display
│ ├── components/
│ └── tailwind.config.js

# 📦 Installation (Local)

### 1. Backend (Flask API)

cd backend
python -m venv venv
source venv/bin/activate  
pip install -r requirements.txt
python app.py

### 2. Frontend (Next.js)
cd frontend
npm install
npm run dev

## 📚 Training the Model
The ML model is based on a modified version of the [Detecting Spam in Emails with LSTMs](https://www.kaggle.com/code/hrhuynguyen/detecting-spam-in-emails-with-lstms-99-accuracy) 
notebook by [hrhuynguyen](https://www.kaggle.com/hrhuynguyen).

### Modifications made:
- Adapted the dataset for phishing detection
- Simplified preprocessing for deployment
- Exported trained model as `.h5` file using `tensorflow.keras`
- Created a Flask API that loads and serves predictions

### Dataset used:
📎 [Kaggle Email Spam Dataset](https://www.kaggle.com/datasets/balaka18/email-spam-classification-dataset-csv)

The model uses:
- Text cleaning, tokenization
- Keras Tokenizer + padding
- LSTM layers

📄 License
MIT License

👤 Author
Walaa Mohamed