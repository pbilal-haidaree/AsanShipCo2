from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.car import Car
from schemas.car import CarCreate, CarUpdate, CarResponse
from utils.auth import get_current_user, require_admin

router = APIRouter(prefix="/api/cars", tags=["cars"])


@router.post("", response_model=CarResponse)
def create_car(car: CarCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    existing = db.query(Car).filter(Car.license_plate == car.license_plate).first()
    if existing:
        raise HTTPException(status_code=400, detail="Car with this license plate already exists")

    db_car = Car(
        make=car.make,
        model=car.model,
        year=car.year,
        color=car.color,
        license_plate=car.license_plate,
        status=car.status,
    )
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return db_car


@router.get("", response_model=list[CarResponse])
def get_all_cars(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return db.query(Car).all()


@router.get("/{car_id}", response_model=CarResponse)
def get_car(car_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car


@router.put("/{car_id}", response_model=CarResponse)
def update_car(car_id: int, data: CarUpdate, db: Session = Depends(get_db), _=Depends(require_admin)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(car, field, value)

    db.commit()
    db.refresh(car)
    return car


@router.delete("/{car_id}")
def delete_car(car_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    if car.orders:
        raise HTTPException(status_code=400, detail="Cannot delete car with existing orders")

    db.delete(car)
    db.commit()
    return {"message": "Car deleted"}
