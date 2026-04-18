# AsanShipCo Frontend Project Structure

## 📁 Directory Layout

```
src/
├── pages/                          # Page components
│   ├── Landing.jsx                # Landing page (public)
│   ├── Login.jsx                  # Login page (public)
│   ├── CustomerDashboard.jsx      # Customer dashboard (protected)
│   └── AdminDashboard.jsx         # Admin dashboard (protected)
│
├── layouts/                        # Layout components
│   ├── Navbar.jsx                 # Navigation bar (appears on all pages)
│   └── Sidebar.jsx                # Sidebar navigation (dashboards only)
│
├── components/                    # Reusable components
│   ├── customer/
│   │   └── OrderHistory.jsx       # Display customer order history
│   ├── admin/
│   │   ├── ManageCars.jsx         # Manage car inventory
│   │   ├── ManageCustomers.jsx    # Manage customers
│   │   └── ManageShipping.jsx     # Manage shipping status
│   └── forms/
│       ├── AddCarForm.jsx         # Add new car form
│       ├── EditCarForm.jsx        # Edit car form
│       ├── AddCustomerForm.jsx    # Add new customer form
│       └── UpdateShippingForm.jsx # Update shipping status form
│
├── data/                          # Mock data
│   └── mockData.js                # Mock cars, customers, orders, statuses
│
├── styles/                        # CSS stylesheets
│   ├── navbar.css                 # Navbar styling
│   ├── sidebar.css                # Sidebar styling
│   ├── landing.css                # Landing page styling
│   ├── login.css                  # Login page styling
│   ├── dashboard.css              # Dashboard wrapper styling
│   ├── customer-dashboard.css     # Customer dashboard specific styles
│   ├── admin-dashboard.css        # Admin dashboard specific styles
│   ├── order-history.css          # Order history component styles
│   ├── manage-cars.css            # Manage cars component styles
│   ├── manage-customers.css       # Manage customers component styles
│   ├── manage-shipping.css        # Manage shipping component styles
│   └── forms.css                  # Form components styling
│
├── App.jsx                        # Main app with routing
├── App.css                        # Global app styles
├── main.jsx                       # React entry point
└── index.css                      # Global styles
```

## 🔄 Application Flow

### Public Pages
1. **Landing Page** (`/`)
   - Hero section with company branding
   - About section
   - Services section
   - Features list
   - Call-to-action button to login

2. **Login Page** (`/login`)
   - Email and password input
   - Role selection (Customer or Admin)
   - Mock authentication logic
   - Demo credentials display

### Protected Pages

#### Customer Dashboard (`/customer-dashboard`)
- **Sidebar Navigation**
  - Order History
- **Main Content**
  - Order History component showing list of customer orders
  - Each order displays:
    - Vehicle details (make, model, year)
    - Shipping status
    - Delivery date
    - Order date

#### Admin Dashboard (`/admin-dashboard`)
- **Sidebar Navigation**
  - Manage Cars
  - Manage Customers
  - Shipping Status
- **Main Content Sections**
  - **Manage Cars**
    - Table of all cars
    - Add Car Form
    - Edit Car Form
    - Delete Car functionality
  - **Manage Customers**
    - Table of all customers
    - Add Customer Form
    - Remove Customer functionality
  - **Shipping Status**
    - Cards for each order
    - Update shipping status dropdown/form
    - Real-time status updates

## 🎨 Design System

### Colors
- Primary: #667eea (Purple)
- Secondary: #3498db (Blue)
- Dark: #2c3e50 (Dark Gray)
- Light: #f5f7fa (Very Light Blue)
- Success: #27ae60 (Green)
- Danger: #e74c3c (Red)
- Warning: #f39c12 (Orange)

### Typography
- Font Family: System fonts (Apple/Segoe UI/Roboto)
- Headings: 24px - 48px, Font-weight: 600-700
- Body: 13px - 16px, Font-weight: 400-500
- Labels: 12px - 14px, Font-weight: 600

### Spacing
- Base unit: 8px
- Components gap: 12px - 20px
- Section padding: 20px - 30px
- Card padding: 16px - 20px

## 📊 Mock Data Structure

### Cars
```javascript
{
  id: number,
  make: string,
  model: string,
  year: number,
  color: string,
  licensePlate: string,
  status: 'Available' | 'In Transit' | 'In Maintenance' | 'Sold'
}
```

### Customers
```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  joinDate: string (YYYY-MM-DD)
}
```

### Orders
```javascript
{
  id: number,
  orderId: string,
  carDetails: { make, model, year },
  status: 'Pending' | 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered',
  shippingAddress: string,
  date: string (YYYY-MM-DD),
  estimatedDelivery: string (YYYY-MM-DD)
}
```

## 🔐 Role-Based Access Control

### Customer Role
- Can access: `/` (landing), `/login`, `/customer-dashboard`
- Cannot access: `/admin-dashboard`
- Permissions:
  - View own orders
  - View order status
  - View shipping information

### Admin Role
- Can access: `/` (landing), `/login`, `/admin-dashboard`
- Cannot access: customer features
- Permissions:
  - Manage cars (add, edit, delete)
  - Manage customers (add, remove)
  - Update shipping status

## 🚀 Future Backend Integration

To connect this frontend to a backend API:

1. **Replace mock data calls** with actual API endpoints
   - Replace `mockData.js` imports with API service calls
   - Create `services/api.js` for all API endpoints

2. **Authentication flow**
   - Replace role-based logic with actual JWT tokens
   - Store auth token in localStorage/session
   - Add auth interceptor to API calls

3. **API Endpoints to implement**
   - `POST /auth/login` - Authenticate user
   - `GET /api/orders` - Fetch user orders
   - `GET /api/cars` - Fetch all cars
   - `POST /api/cars` - Add new car
   - `PUT /api/cars/{id}` - Update car
   - `DELETE /api/cars/{id}` - Delete car
   - `GET /api/customers` - Fetch all customers
   - `POST /api/customers` - Add new customer
   - `DELETE /api/customers/{id}` - Delete customer
   - `PUT /api/orders/{id}/status` - Update order status

4. **State management** (optional)
   - Consider adding Context API or Redux for complex state
   - Currently uses React hooks and local component state

## 📱 Responsive Design

- **Desktop**: Full layout with sidebar and navbar
- **Tablet** (768px): Sidebar visibility adjusted
- **Mobile** (600px): Sidebar hidden, single column layout

## 🛠 Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## 📝 Component Documentation

### Navbar
- Shows company branding
- Login/Logout buttons
- Displays user role when logged in

### Sidebar
- Navigation for dashboard sections
- Active section highlighting
- Role-specific menu items

### Forms
- Reusable form components
- Form validation
- Error handling

### Cards & Tables
- Order cards with hover effects
- Responsive tables
- Status badges

## 🎯 Key Features

✅ Role-based routing and access control
✅ Professional, modern UI with clean design
✅ Responsive across all devices
✅ Mock data for testing
✅ Modular component structure
✅ Ready for backend integration
✅ Clean, maintainable code
✅ Professional styling and animations
