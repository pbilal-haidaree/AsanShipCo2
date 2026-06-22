import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified
from database import get_db
from models.car import Car
from schemas.car import CarResponse
from utils.auth import get_current_user, require_admin

router = APIRouter(prefix="/api/cars", tags=["images"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads", "cars")
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


@router.post("/{car_id}/images", response_model=CarResponse)
async def upload_car_images(
    car_id: int,
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    if len(files) > 10:
        raise HTTPException(status_code=400, detail="Maximum 10 images per upload")

    car_dir = os.path.join(UPLOAD_DIR, str(car_id))
    os.makedirs(car_dir, exist_ok=True)

    current_images = car.images or []

    for file in files:
        ext = os.path.splitext(file.filename or "")[1].lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(status_code=400, detail=f"File type {ext} not allowed. Use: {', '.join(ALLOWED_EXTENSIONS)}")

        contents = await file.read()
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail=f"File {file.filename} exceeds 5 MB limit")

        filename = f"{uuid.uuid4().hex}{ext}"
        filepath = os.path.join(car_dir, filename)

        with open(filepath, "wb") as f:
            f.write(contents)

        current_images.append(f"cars/{car_id}/{filename}")

    car.images = list(current_images)
    flag_modified(car, "images")
    db.commit()
    db.refresh(car)
    return car


@router.delete("/{car_id}/images/{filename}")
def delete_car_image(
    car_id: int,
    filename: str,
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    image_path = f"cars/{car_id}/{filename}"
    current_images = car.images or []

    if image_path not in current_images:
        raise HTTPException(status_code=404, detail="Image not found")

    filepath = os.path.join(UPLOAD_DIR, str(car_id), filename)
    if os.path.exists(filepath):
        os.remove(filepath)

    current_images.remove(image_path)
    car.images = list(current_images)
    flag_modified(car, "images")
    db.commit()
    return {"message": "Image deleted"}
