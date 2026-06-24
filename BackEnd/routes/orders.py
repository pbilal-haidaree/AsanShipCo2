# Order CRUD endpoints. Admins see all orders; customers only see their own.
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models.order import Order
from models.car import Car
from models.customer import Customer
from schemas.order import OrderCreate, OrderUpdate, OrderResponse
from utils.auth import get_current_user, require_admin
from models.user import User

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("", response_model=OrderResponse)
def create_order(order: OrderCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    customer = db.query(Customer).filter(Customer.id == order.customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    car = db.query(Car).filter(Car.id == order.car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    if car.status != "Available":
        raise HTTPException(status_code=400, detail="Car is not available for assignment")

    db_order = Order(
        customer_id=order.customer_id,
        car_id=order.car_id,
        shipping_address=order.shipping_address,
        estimated_delivery=order.estimated_delivery,
    )
    car.status = "Sold"
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


@router.get("", response_model=list[OrderResponse])
def get_all_orders(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    query = db.query(Order).options(joinedload(Order.car), joinedload(Order.customer))

    if current_user.role == "admin":
        return query.all()

    customer = db.query(Customer).filter(Customer.user_id == current_user.id).first()
    if not customer:
        return []
    return query.filter(Order.customer_id == customer.id).all()


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    order = db.query(Order).options(joinedload(Order.car), joinedload(Order.customer)).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if current_user.role != "admin":
        customer = db.query(Customer).filter(Customer.user_id == current_user.id).first()
        if not customer or order.customer_id != customer.id:
            raise HTTPException(status_code=403, detail="Access denied")

    return order


@router.put("/{order_id}", response_model=OrderResponse)
def update_order(order_id: int, data: OrderUpdate, db: Session = Depends(get_db), _=Depends(require_admin)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(order, field, value)

    db.commit()
    db.refresh(order)
    return order


@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(order)
    db.commit()
    return {"message": "Order deleted"}
