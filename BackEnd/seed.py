"""Run once to create the default admin account."""
from database import SessionLocal
from models.user import User
from utils.auth import hash_password

db = SessionLocal()

existing = db.query(User).filter(User.email == "admin@asanshipco.com").first()
if existing:
    print("Admin account already exists, skipping.")
else:
    admin = User(
        name="Admin",
        email="admin@asanshipco.com",
        password_hash=hash_password("admin123"),
        role="admin",
    )
    db.add(admin)
    db.commit()
    print("Default admin created: admin@asanshipco.com / admin123")
    print("IMPORTANT: Change this password after first login!")

db.close()
