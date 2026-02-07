from repository.mock_db import db

class AuthService:
    def register(self, email, password, full_name, role='patient'):
        if db.get_user_by_email(email):
            return {"error": "User already exists"}, 400
        
        user = db.create_user({
            "email": email,
            "password": password, # In real app, hash this!
            "full_name": full_name,
            "role": role
        })
        return {"message": "User registered successfully", "user_id": user['id']}, 201

    def login(self, email, password):
        user = db.get_user_by_email(email)
        if not user or user['password'] != password:
            return {"error": "Invalid credentials"}, 401
        
        return {
            "message": "Login successful",
            "token": "fake-jwt-token", # In real app, generate JWT
            "user": {
                "id": user['id'],
                "email": user['email'],
                "full_name": user['full_name'],
                "role": user['role']
            }
        }, 200

auth_service = AuthService()
