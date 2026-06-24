# Run once to create default admin and customer accounts for initial setup.
import sys
from database import SessionLocal
from models.user import User
from models.customer import Customer
from utils.auth import hash_password

db = SessionLocal()

try:
    # Admin account
    if not db.query(User).filter(User.email == "admin@asanshipco.com").first():
        admin = User(
            name="Admin",
            email="admin@asanshipco.com",
            password_hash=hash_password("admin123"),
            role="admin",
        )
        db.add(admin)
        db.commit()
        print("Admin created: admin@asanshipco.com / admin123")
    else:
        print("Admin already exists, skipping.")

    # Customer account
    if not db.query(User).filter(User.email == "customer@asanshipco.com").first():
        customer_user = User(
            name="Jane Smith",
            email="customer@asanshipco.com",
            password_hash=hash_password("customer123"),
            role="customer",
        )
        db.add(customer_user)
        db.flush()

        customer = Customer(
            name="Jane Smith",
            email="customer@asanshipco.com",
            phone="+1 555-123-4567",
            address="123 Main St, New York, NY 10001",
            user_id=customer_user.id,
        )
        db.add(customer)
        db.commit()
        print("Customer created: customer@asanshipco.com / customer123")
    else:
        print("Customer already exists, skipping.")

    print("\nIMPORTANT: Change these passwords after first login!")

except Exception as e:
    db.rollback()
    print(f"Error during seeding: {e}", file=sys.stderr)
    sys.exit(1)
finally:
    db.close()
