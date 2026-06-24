# FastAPI application entry point. Registers all routers, CORS middleware, and static file serving.
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.exc import IntegrityError
from config import ALLOWED_ORIGINS
from database import engine, Base
from routes.auth import router as auth_router
from routes.cars import router as cars_router
from routes.customers import router as customers_router
from routes.images import router as images_router
from routes.orders import router as orders_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AsanShipCo API")


@app.exception_handler(IntegrityError)
async def integrity_error_handler(request: Request, exc: IntegrityError):
    return JSONResponse(status_code=409, content={"detail": "A record with that data already exists"})


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(cars_router)
app.include_router(customers_router)
app.include_router(images_router)
app.include_router(orders_router)

uploads_dir = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")


@app.get("/api/health")
def health_check():
    try:
        with engine.connect():
            return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": str(e)}
