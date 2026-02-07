#!/bin/bash

# MedTrack AWS EC2 Deployment Script
# This script assumes Amazon Linux 2 or Amazon Linux 2023

echo "Starting MedTrack Deployment..."

# 1. Update System
sudo yum update -y

# 2. Install Python 3 and Git
sudo yum install python3 git -y

# 3. Project Setup (Assuming code is already here or pulled via git)
# If pulling from git:
# git clone <your-repo-url>
# cd <repo-folder>

# Navigate to backend (adjust path as needed)
# cd backend

# 4. Create Virtual Environment
python3 -m venv venv
source venv/bin/activate

# 5. Install Dependencies
pip install -r requirements.txt

# 6. Set Environment Variables
# You should configure these in a .env file or export them here
export AWS_DEFAULT_REGION=us-east-1
export USE_AWS=True
# export AWS_ACCESS_KEY_ID=... (Better to use IAM Instance Profile)
# export AWS_SECRET_ACCESS_KEY=...

# 7. Run Database Setup (only needs to run once)
python setup_dynamodb.py

# 8. Start Application with Gunicorn
# API will run on port 5000
echo "Starting Gunicorn Server..."
gunicorn -w 4 -b 0.0.0.0:5000 app:app --daemon

echo "MedTrack Backend Deployed Successfully!"
echo "Make sure Security Group allows inbound traffic on port 5000."
