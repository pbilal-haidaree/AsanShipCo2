# AsanShipCo - Order Management & Tracking System

A comprehensive order management and product tracking platform built for AsanShipCo customers. This full-stack application enables customers to browse products, manage orders, and track shipments while providing administrators with powerful tools to manage inventory, customers, and shipping operations.

## 📋 Overview

AsanShipCo is an enterprise-grade e-commerce order management system designed to streamline customer interactions and administrative operations. The platform provides a seamless experience for customers to track their purchases and shipping status, while giving administrators complete control over product catalog, customer management, and order fulfillment.

## 🛠 Technology Stack

### Frontend
- **React** - UI library for building interactive user interfaces
- **Vite** - Next-generation frontend build tool for optimal performance
- **CSS** - Styling and responsive design

### Backend
- **Python** - Server-side programming language
- **FastAPI** - Modern, fast web framework for building APIs
- **PostgreSQL** - Relational database for data persistence

## ✨ Features

### Customer Features
- **User Authentication** - Secure login and session management
- **Product Browsing** - Browse available products with detailed information
- **Order History** - View complete purchase history
- **Order Status Tracking** - Real-time tracking of current orders and shipment status
- **Order Details** - Access detailed information about each order including items, prices, and delivery timeline

### Admin Features
- **Customer Management** - Add, edit, and manage customer accounts
- **Shipping Status Updates** - Update and manage order shipping status in real-time
- **Product Inventory** - Add, edit, and delete products from the catalog
- **Order Assignment** - Add products to customer orders
- **Dashboard** - Comprehensive admin dashboard for monitoring all operations
- **User Administration** - Manage admin and customer roles

## 📂 Project Structure

```
AsanShipCo/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx         # Admin dashboard
│   │   └── login.jsx             # Authentication component
│   ├── styles/
│   │   ├── dashboard.css         # Dashboard styling
│   │   └── login.css             # Login styling
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Application entry point
│   ├── index.css                 # Global styles
│   └── assets/                   # Static assets
├── public/                       # Public assets
├── package.json                  # Frontend dependencies
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint rules
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) - For running the React frontend
- **Python** (v3.8 or higher) - For running the FastAPI backend
- **PostgreSQL** (v12 or higher) - Database server
- **pip** - Python package manager

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (or the port specified by Vite)

3. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure database**
   - Create a PostgreSQL database for the project
   - Set up environment variables for database connection

4. **Run database migrations** (if applicable)
   ```bash
   alembic upgrade head
   ```

5. **Start the FastAPI server**
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`

## 🔐 Authentication & Authorization

The application implements role-based access control with two user types:

### Admin Role
- Full administrative privileges
- Access to customer management
- Inventory and product management
- Shipping status control
- Can add and edit all order information

### Customer Role
- Limited to personal account features
- View only their own orders and order history
- Browse available products
- Cannot modify order or customer data

## 📡 API Endpoints

**Note:** Detailed API documentation available at `http://localhost:8000/docs` when the FastAPI backend is running.

### Core Endpoints
- `POST /auth/login` - Customer/Admin login
- `GET /products` - Browse products
- `GET /orders` - Retrieve customer orders
- `GET /orders/{id}/status` - Check order status
- `POST /admin/customers` - Create new customer (Admin only)
- `PUT /admin/orders/{id}/status` - Update shipping status (Admin only)
- `POST /admin/products` - Add new product (Admin only)

## 🗄 Database Schema

The PostgreSQL database includes tables for:
- **Users** - Customer and admin accounts
- **Products** - Product catalog and inventory
- **Orders** - Order records and customer purchases
- **OrderItems** - Individual items within orders
- **Shipping** - Shipping and delivery information

## 🔧 Configuration

Create a `.env` file in the backend directory with the following variables:

```
DATABASE_URL=postgresql://user:password@localhost/asanshipco
SECRET_KEY=your_secret_key_here
ALLOWED_ORIGINS=http://localhost:5173
DEBUG=True
```

## 📝 Usage

### For Customers
1. Navigate to the login page
2. Enter credentials or create a new account
3. Browse available products
4. View order history and current order status
5. Track shipments in real-time

### For Admins
1. Log in with admin credentials
2. Access the admin dashboard
3. Manage customers, products, and orders
4. Update shipping status for orders
5. Monitor all platform activities

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
- Create a new branch for your feature
- Follow the existing code style
- Test your changes thoroughly
- Submit a pull request with detailed description

## 📄 License

This project is proprietary software developed for AsanShipCo. All rights reserved.

## 📞 Support

For issues, questions, or feature requests, please contact the development team or open an issue in the project repository.

---

**Built with ❤️ for AsanShipCo Customers**
