from pydantic import BaseModel, EmailStr
from datetime import datetime


class CustomerCreate(BaseModel):
    name: str
    email: str
    phone: str
    address: str


class CustomerUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    address: str | None = None


class CustomerResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    address: str
    created_at: datetime

    model_config = {"from_attributes": True}
