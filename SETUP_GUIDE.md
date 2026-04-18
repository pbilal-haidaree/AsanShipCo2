# AsanShipCo Frontend - Setup & Quick Start Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including React Router.

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default)

### 3. Open in Browser

Navigate to the landing page where you'll see:
- Hero section with AsanShipCo branding
- Services overview
- Features list
- Login button in navigation

## 🔐 Testing the Application

### Login Flow

1. Click **"Login"** button in top-right corner
2. You'll be taken to the login page
3. Enter any email and password (mock authentication)
4. Select a role:
   - **👤 Customer** - Access to order history
   - **🔐 Admin** - Access to management panels

### Demo Credentials (for reference)
- Customer: `customer@example.com` / `password`
- Admin: `admin@example.com` / `password`

(These are displayed on the login page as well)

## 👥 Testing Different Roles

### As a Customer

1. Login with Customer role
2. You'll be redirected to `/customer-dashboard`
3. Sidebar shows: **📋 Order History**
4. View mock order cards with:
   - Vehicle details
   - Shipping status
   - Estimated delivery
   - Current order status

### As an Admin

1. Login with Admin role
2. You'll be redirected to `/admin-dashboard`
3. Sidebar shows three sections:
   - **🚗 Manage Cars** - Add, edit, delete vehicles
   - **👥 Manage Customers** - Add, manage customers
   - **📦 Shipping Status** - Update order shipping status

4. **Features to try:**
   - Add a new car using the form
   - Edit car details
   - Delete a car (confirmation dialog)
   - Add a new customer
   - Update shipping status with dropdown

## 📂 Key Files to Know

- **App.jsx** - Main routing configuration
- **pages/** - All page components (Landing, Login, Dashboards)
- **components/** - Reusable components (forms, tables, cards)
- **layouts/** - Navigation layouts (Navbar, Sidebar)
- **data/mockData.js** - All mock data (cars, customers, orders)
- **styles/** - CSS for all components

## 🎨 Customization

### Change Mock Data
Edit `src/data/mockData.js` to modify:
- Cars list
- Customers list
- Orders list
- Shipping statuses
- Car statuses

### Modify Colors
Update colors in CSS files:
- Primary color: `#667eea`
- Secondary color: `#3498db`
- Dark color: `#2c3e50`

### Add New Features
1. Create component in `components/` directory
2. Import in respective page
3. Add CSS file in `styles/`
4. Update routing if needed

## 🔌 Preparing for Backend Integration

When you're ready to connect to a backend API:

1. **Create API service file** (`src/services/api.js`)
   ```javascript
   const API_BASE = 'http://localhost:8000';
   
   export const loginUser = (email, password, role) => {
     return fetch(`${API_BASE}/auth/login`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password, role })
     });
   };
   ```

2. **Replace mock data** in components with API calls
   ```javascript
   // Instead of:
   const { mockOrders } = require('../data/mockData');
   
   // Use:
   const [orders, setOrders] = useState([]);
   useEffect(() => {
     fetchOrders();
   }, []);
   ```

3. **Update form submissions** to call API endpoints

4. **Add error handling** for API failures

5. **Add loading states** during API calls

## 🛠 Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## 📋 File Manifest

### Pages
- [x] Landing.jsx - Landing page
- [x] Login.jsx - Login/authentication
- [x] CustomerDashboard.jsx - Customer dashboard
- [x] AdminDashboard.jsx - Admin dashboard

### Layouts
- [x] Navbar.jsx - Navigation bar
- [x] Sidebar.jsx - Dashboard sidebar

### Components
- [x] OrderHistory.jsx - Customer order display
- [x] ManageCars.jsx - Admin car management
- [x] ManageCustomers.jsx - Admin customer management
- [x] ManageShipping.jsx - Admin shipping management
- [x] AddCarForm.jsx - Add car form
- [x] EditCarForm.jsx - Edit car form
- [x] AddCustomerForm.jsx - Add customer form
- [x] UpdateShippingForm.jsx - Update shipping form

### Data
- [x] mockData.js - Mock data for all entities

### Styles
- [x] index.css - Global styles
- [x] App.css - App-wide styles
- [x] navbar.css - Navbar styles
- [x] sidebar.css - Sidebar styles
- [x] landing.css - Landing page styles
- [x] login.css - Login page styles
- [x] dashboard.css - Dashboard layout styles
- [x] customer-dashboard.css - Customer dashboard styles
- [x] admin-dashboard.css - Admin dashboard styles
- [x] order-history.css - Order history styles
- [x] manage-cars.css - Manage cars styles
- [x] manage-customers.css - Manage customers styles
- [x] manage-shipping.css - Manage shipping styles
- [x] forms.css - Form styles

## 🎯 Next Steps

1. ✅ Frontend structure complete
2. ⏭️ Build backend API (FastAPI, Python)
3. ⏭️ Set up PostgreSQL database
4. ⏭️ Connect frontend to backend
5. ⏭️ Test end-to-end flow
6. ⏭️ Deploy to production

## 📞 Support

For questions or issues:
1. Check component JSX comments
2. Review CSS styling
3. Test with mock data first
4. Verify routing configuration

---

**Ready to build the backend!** 🚀
