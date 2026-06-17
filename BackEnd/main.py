# ============================================================================
# ASAN SHIP CO - BACKEND API
# ============================================================================
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime

# ============================================================================
# DATABASE CONFIGURATION
# ============================================================================
DATABASE_URL = "postgresql://postgres:admin26@localhost:5432/asan_shipco"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ============================================================================
# DATABASE MODELS
# ============================================================================
class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    address = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)


# ============================================================================
# PYDANTIC SCHEMAS
# ============================================================================
class CustomerCreate(BaseModel):
    name: str
    email: str
    phone: str
    address: str


class CustomerUpdate(BaseModel):
    name: str = None
    email: str = None
    phone: str = None
    address: str = None


class CustomerResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    address: str
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================================================
# FASTAPI APPLICATION
# ============================================================================
app = FastAPI()


# ============================================================================
# DATABASE DEPENDENCY
# ============================================================================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ============================================================================
# ENDPOINTS
# ============================================================================

@app.get("/api/hello")
def hello_world():
    return {
        "message": "Hello from Asan Ship Co API!",
        "status": "success"
    }


@app.get("/api/health")
def health_check():
    try:
        with engine.connect() as connection:
            return {
                "status": "success",
                "database": "Connected to PostgreSQL 18"
            }
    except Exception as e:
        return {
            "status": "error",
            "database": f"Failed to connect: {str(e)}"
        }


@app.post("/api/customers")
def create_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    db_customer = Customer(
        name=customer.name,
        email=customer.email,
        phone=customer.phone,
        address=customer.address
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


@app.get("/api/customers", response_model=list[CustomerResponse])
def get_all_customers(db: Session = Depends(get_db)):
    customers = db.query(Customer).all()
    return customers


@app.get("/api/customers/{customer_id}", response_model=CustomerResponse)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(
            status_code=404,
            detail=f"Customer with ID {customer_id} not found"
        )
    return customer


@app.put("/api/customers/{customer_id}", response_model=CustomerResponse)
def update_customer(
    customer_id: int, 
    customer_update: CustomerUpdate, 
    db: Session = Depends(get_db)
):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    
    if not customer:
        raise HTTPException(
            status_code=404,
            detail=f"Customer with ID {customer_id} not found"
        )
    
    if customer_update.name is not None:
        customer.name = customer_update.name
    if customer_update.email is not None:
        customer.email = customer_update.email
    if customer_update.phone is not None:
        customer.phone = customer_update.phone
    if customer_update.address is not None:
        customer.address = customer_update.address
    
    db.commit()
    db.refresh(customer)
    return customer


@app.delete("/api/customers/{customer_id}")
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    
    if not customer:
        raise HTTPException(
            status_code=404,
            detail=f"Customer with ID {customer_id} not found"
        )
    
    db.delete(customer)
    db.commit()
    
    return {
        "status": "success",
        "message": f"Customer with ID {customer_id} has been deleted"
    }


# ============================================================================
# CREATE TABLES ON STARTUP
# ============================================================================
# THIS LINE IS CRUCIAL - It creates the customers table when the server starts
Base.metadata.create_all(bind=engine)