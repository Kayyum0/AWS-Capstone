# MedTrack: AWS Cloud-Enabled Healthcare Management System

**MedTrack** is a secure, cloud-native healthcare management platform designed to streamline interactions between patients and doctors. Built on AWS, it offers a robust solution for appointment booking, medical record management, and real-time communication.

## 🚀 Features

### For Patients
*   **Easy Registration**: Secure sign-up/login process.
*   **Find Doctors**: Browse registered doctors by specialization.
*   **Book Appointments**: Real-time appointment scheduling with instant confirmation.
*   **Medical History**: View your complete medical history and prescriptions online.
*   **Notifications**: Receive SMS/Email notifications for confirmed appointments via AWS SNS.

### For Doctors
*   **Doctor Portal**: Dedicated dashboard to manage your practice.
*   **Appointment Management**: View upcoming appointments and patient details.
*   **Patient Database**: specific access to your patients' records.
*   **Digital Prescriptions**: Add diagnoses and prescriptions directly to patient records.
*   **Privacy Focused**: You only see appointments and records relevant to your patients.

### AWS Cloud Integration
*   **Compute**: Hosted on **AWS EC2** for reliable, scalable performance.
*   **Database**: **AWS DynamoDB** for high-performance, NoSQL storage of users, appointments, and records.
*   **Notifications**: **AWS SNS** for reliable system notifications.
*   **Security**: IAM roles and policies ensure secure access to AWS resources.

## 🛠️ Tech Stack

*   **Frontend**: React.js, Vite, Tailwind CSS
*   **Backend**: Python, Flask, Boto3 (AWS SDK)
*   **Database**: AWS DynamoDB
*   **DevOps**: Shell Scripting for Automation

## 📦 Installation & Local Setup

### Prerequisites
*   Node.js & npm
*   Python 3.8+
*   AWS Account (for full features)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd medtrack
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```
*The backend runs on `http://localhost:5000`.*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*The frontend runs on `http://localhost:5173`.*

## ☁️ AWS Deployment

We have included automated scripts to make deployment to AWS EC2 easy.

1.  **Launch an EC2 Instance** (Amazon Linux 2/2023).
2.  **SSH into your instance**.
3.  **Run the Deployment Script**:
    ```bash
    ./deploy_ec2.sh
    ```
4.  **Database Setup**:
    Run the setup script *once* to create DynamoDB tables:
    ```bash
    python backend/setup_dynamodb.py
    ```

*For detailed deployment instructions, please refer to [DEPLOYMENT.md](DEPLOYMENT.md).*

## 📂 Project Structure

```
medtrack/
├── backend/
│   ├── app.py                 # Flask Application Entry
│   ├── repository/            # Database Access Layer (DynamoDB/Mock)
│   ├── routes/                # API Endpoints
│   ├── services/              # Business Logic
│   └── setup_dynamodb.py      # AWS Table Provisioning Script
├── frontend/
│   ├── src/
│   │   ├── pages/             # React Pages (Dashboard, Login, etc.)
│   │   ├── components/        # Reusable UI Components
│   │   └── services/          # API Integration
│   └── vite.config.js
└── deploy_ec2.sh              # AWS Deployment Automation
```

---
*MedTrack - Capstone Project 2026*
