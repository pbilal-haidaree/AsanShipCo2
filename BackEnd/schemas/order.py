# Pydantic schemas for order CRUD and nested car/customer summaries in responses.
from pydantic import BaseModel, Field
from datetime import datetime


class OrderCreate(BaseModel):
    customer_id: int
    car_id: int
    shipping_address: str = Field(min_length=1, max_length=300)
    estimated_delivery: datetime | None = None


class OrderUpdate(BaseModel):
    status: str | None = None
    shipping_address: str | None = Field(default=None, min_length=1, max_length=300)
    estimated_delivery: datetime | None = None


class CarBrief(BaseModel):
    id: int
    make: str
    model: str
    year: int
    color: str | None
    license_plate: str
    images: list | None = None

    model_config = {"from_attributes": True}


class CustomerBrief(BaseModel):
    id: int
    name: str
    email: str

    model_config = {"from_attributes": True}


class OrderResponse(BaseModel):
    id: int
    customer_id: int
    car_id: int
    status: str
    shipping_address: str
    order_date: datetime
    estimated_delivery: datetime | None
    created_at: datetime
    car: CarBrief | None = None
    customer: CustomerBrief | None = None

    model_config = {"from_attributes": True}
