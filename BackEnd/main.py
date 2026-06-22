from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import ALLOWED_ORIGINS
from database import engine, Base
from routes.auth import router as auth_router
from routes.customers import router as customers_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AsanShipCo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(customers_router)


@app.get("/api/health")
def health_check():
    try:
        with engine.connect():
            return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": str(e)}
