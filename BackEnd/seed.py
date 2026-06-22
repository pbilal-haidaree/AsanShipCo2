"""Run once to create the default admin account and sample data."""
import sys
from database import SessionLocal
from models.user import User
from models.customer import Customer
from utils.auth import hash_password

db = SessionLocal()

try:
    existing = db.query(User).filter(User.email == "admin@asanshipco.com").first()
    if existing:
        print("Admin account already exists, skipping.")
    else:
        admin = User(
            name="Admin",
            email="admin@asanshipco.com",
            password_hash=hash_password("admin123!"),
            role="admin",
        )
        db.add(admin)
        db.commit()
        print("Default admin created: admin@asanshipco.com / admin123!")
        print("IMPORTANT: Change this password after first login!")

    if not db.query(Customer).first():
        sample = Customer(
            name="Sample Customer",
            email="customer@example.com",
            phone="+1234567890",
            address="123 Main St, New York, NY 10001",
        )
        db.add(sample)
        db.commit()
        print("Sample customer created.")
    else:
        print("Customers already exist, skipping sample data.")

except Exception as e:
    db.rollback()
    print(f"Error during seeding: {e}", file=sys.stderr)
    sys.exit(1)
finally:
    db.close()
