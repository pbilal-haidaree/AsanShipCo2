# AsanShipCo

Vehicle shipping and logistics management platform. Manages cars, customers, and shipping orders with role-based dashboards for admins and customers.

## Tech Stack

| Layer        | Technology                                       |
| ------------ | ------------------------------------------------ |
| Frontend     | React 19, React Router 6, Vite 8                 |
| Backend      | FastAPI, SQLAlchemy, Alembic                      |
| Database     | PostgreSQL                                       |
| Auth         | JWT (python-jose) + bcrypt password hashing       |
| File Storage | Local disk (car images via multipart upload)      |

## Project Structure

```
AsanShipCo/
├── src/                          # React frontend
│   ├── pages/                    # Route-level page components
│   │   ├── Landing.jsx           # Public marketing page
│   │   ├── Login.jsx             # JWT-authenticated sign-in
│   │   ├── AdminDashboard.jsx    # Admin dashboard shell
│   │   └── CustomerDashboard.jsx # Customer dashboard shell
│   ├── components/
│   │   ├── admin/                # Admin-only views
│   │   │   ├── ManageCars.jsx    # Car CRUD with image uploads
│   │   │   ├── ManageCustomers.jsx
│   │   │   ├── ManageShipping.jsx
│   │   │   └── AssignCar.jsx     # Link cars to customers
│   │   ├── customer/             # Customer-only views
│   │   │   ├── BrowseCars.jsx    # Browse available vehicles
│   │   │   └── OrderHistory.jsx  # View orders by status
│   │   └── forms/                # Shared form components
│   ├── layouts/                  # Navbar and Sidebar
│   ├── services/api.js           # API client (fetch + JWT)
│   ├── data/mockData.js          # Status constants for dropdowns
│   ├── styles/                   # Component-scoped CSS
│   └── assets/                   # Static images
├── BackEnd/                      # FastAPI backend
│   ├── models/                   # SQLAlchemy ORM models
│   ├── schemas/                  # Pydantic request/response schemas
│   ├── routes/                   # API route handlers
│   ├── utils/auth.py             # JWT, bcrypt, role guards
│   ├── alembic/                  # Database migrations
│   ├── uploads/                  # Uploaded car images (gitignored)
│   ├── main.py                   # FastAPI app entry point
│   ├── config.py                 # Environment variable loader
│   ├── database.py               # SQLAlchemy engine and session
│   └── seed.py                   # Default admin and customer accounts
├── vite.config.js
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL 14+

### Backend Setup

```bash
cd BackEnd

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env — set DATABASE_URL, generate a strong SECRET_KEY

# Run database migrations
alembic upgrade head

# Seed default accounts
python seed.py

# Start the API server
uvicorn main:app --reload --port 8000
```

### Frontend Setup

```bash
# From the project root
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and expects the API at `http://localhost:8000` (configurable via `VITE_API_URL`).

## Environment Variables

### Backend (`BackEnd/.env`)

| Variable          | Description                                | Example                                            |
| ----------------- | ------------------------------------------ | -------------------------------------------------- |
| `DATABASE_URL`    | PostgreSQL connection string               | `postgresql://user:pass@localhost:5432/asan_shipco` |
| `SECRET_KEY`      | JWT signing key (use a long random string) | `a3f8...64 hex chars`                              |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins               | `http://localhost:5173`                            |

### Frontend

| Variable       | Description     | Default                 |
| -------------- | --------------- | ----------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` |

## Default Accounts

Created by `seed.py` for initial setup:

| Role     | Email                   | Password    |
| -------- | ----------------------- | ----------- |
| Admin    | admin@asanshipco.com    | admin123    |
| Customer | customer@asanshipco.com | customer123 |

**Change these passwords immediately after first login.**

## Features

### Admin Dashboard
- **Manage Cars** — Add, edit, delete vehicles with multi-image uploads
- **Manage Customers** — Create and manage customer records
- **Assign Cars** — Link available cars to customers via shipping orders
- **Manage Shipping** — Track and update order statuses through the full lifecycle

### Customer Dashboard
- **Browse Cars** — View available vehicles with image carousels
- **Order History** — View orders filtered by status (Pending, In Process, Delivered)

### Public Pages
- **Landing Page** — Company overview with services, features, and contact info
- **Login** — JWT-authenticated sign-in with role-based redirect

## Database Schema

Four tables managed via SQLAlchemy + Alembic:

| Table       | Key Fields                                                     |
| ----------- | -------------------------------------------------------------- |
| `users`     | id, name, email, password_hash, role (admin/customer)          |
| `customers` | id, name, email, phone, address, user_id (FK to users)        |
| `cars`      | id, make, model, year, color, license_plate, status, images    |
| `orders`    | id, customer_id, car_id, status, shipping_address, dates       |

## API Endpoints

Interactive docs available at `http://localhost:8000/docs` when the backend is running.

| Method | Path                             | Auth   | Description                 |
| ------ | -------------------------------- | ------ | --------------------------- |
| POST   | `/auth/login`                    | Public | Login, returns JWT          |
| POST   | `/auth/register`                 | Admin  | Register a new user         |
| GET    | `/auth/me`                       | User   | Current user profile        |
| GET    | `/api/cars`                      | User   | List all cars               |
| GET    | `/api/cars/available`            | User   | List available cars         |
| POST   | `/api/cars`                      | Admin  | Create a car                |
| PUT    | `/api/cars/:id`                  | Admin  | Update a car                |
| DELETE | `/api/cars/:id`                  | Admin  | Delete a car                |
| POST   | `/api/cars/:id/images`           | Admin  | Upload car images           |
| DELETE | `/api/cars/:id/images/:filename` | Admin  | Delete a car image          |
| GET    | `/api/customers`                 | Admin  | List all customers          |
| POST   | `/api/customers`                 | Admin  | Create a customer           |
| PUT    | `/api/customers/:id`             | Admin  | Update a customer           |
| DELETE | `/api/customers/:id`             | Admin  | Delete a customer           |
| GET    | `/api/orders`                    | User   | List orders (role-filtered) |
| POST   | `/api/orders`                    | Admin  | Create an order             |
| PUT    | `/api/orders/:id`                | Admin  | Update an order             |
| DELETE | `/api/orders/:id`                | Admin  | Delete an order             |

## License

Proprietary. All rights reserved.
