# Pydantic schemas for customer creation, update, and API response serialization.
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class CustomerCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(max_length=20)
    address: str = Field(max_length=300)


class CustomerUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=20)
    address: str | None = Field(default=None, max_length=300)


class CustomerResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str | None = None
    address: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}
