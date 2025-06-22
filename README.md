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
- Preprocessing: TF-IDF, text cleaning
- Trained on Enron spam + phishing corpora
- Hosted on **Render**

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
📚 Training the Model
The model was trained using a combination of phishing email corpora and ham/spam datasets:

Nazario phishing corpus

Enron dataset

The model uses:

Text preprocessing (lowercasing, tokenization, stopword removal)

TF-IDF vectorization

Logistic Regression classifier

✅ To Do
 Add multi-language support

 Visual email highlighting (e.g., red-flagged lines)

 Export result as PDF

 Add user accounts for email analysis history

📄 License
MIT License

👤 Author
Walaa Mohamed