from pydantic import BaseModel, Field
from datetime import datetime


class CarCreate(BaseModel):
    make: str = Field(min_length=1, max_length=50)
    model: str = Field(min_length=1, max_length=50)
    year: int = Field(ge=1900, le=2100)
    color: str | None = Field(default=None, max_length=30)
    license_plate: str = Field(min_length=1, max_length=20)
    status: str = "Available"


class CarUpdate(BaseModel):
    make: str | None = Field(default=None, min_length=1, max_length=50)
    model: str | None = Field(default=None, min_length=1, max_length=50)
    year: int | None = Field(default=None, ge=1900, le=2100)
    color: str | None = Field(default=None, max_length=30)
    license_plate: str | None = Field(default=None, min_length=1, max_length=20)
    status: str | None = None


class CarResponse(BaseModel):
    id: int
    make: str
    model: str
    year: int
    color: str | None
    license_plate: str
    status: str
    images: list | None = None
    created_at: datetime

    model_config = {"from_attributes": True}
