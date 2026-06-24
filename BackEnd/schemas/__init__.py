# Re-exports Pydantic schemas for convenient imports across the application.
from schemas.customer import CustomerCreate, CustomerUpdate, CustomerResponse
from schemas.auth import LoginRequest, RegisterRequest, TokenResponse, UserResponse
