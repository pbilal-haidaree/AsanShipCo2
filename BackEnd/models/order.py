# Order model. Links a customer to a car with shipping status, address, and delivery dates.
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    car_id = Column(Integer, ForeignKey("cars.id"), nullable=False)
    status = Column(String, nullable=False, default="Pending")
    shipping_address = Column(String, nullable=False)
    order_date = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    estimated_delivery = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    customer = relationship("Customer", back_populates="orders")
    car = relationship("Car", back_populates="orders")
