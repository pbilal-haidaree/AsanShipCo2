// Mock data for the application

export const mockCars = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2023,
    color: "Silver",
    licensePlate: "ABC123",
    status: "Available",
    images: []
  },
  {
    id: 2,
    make: "Honda",
    model: "CR-V",
    year: 2023,
    color: "Blue",
    licensePlate: "XYZ789",
    status: "In Transit",
    images: []
  },
  {
    id: 3,
    make: "Ford",
    model: "F-150",
    year: 2022,
    color: "Red",
    licensePlate: "LMN456",
    status: "Available",
    images: []
  }
];

export const mockCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2024-02-20"
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "m.davis@example.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2024-03-10"
  }
];

export const mockOrders = [
  {
    id: 1,
    orderId: "ORD-2024-001",
    carDetails: {
      make: "Toyota",
      model: "Camry",
      year: 2023,
      images: []
    },
    status: "Delivered",
    shippingAddress: "123 Main St, New York, NY 10001",
    date: "2024-04-01",
    estimatedDelivery: "2024-04-10"
  },
  {
    id: 2,
    orderId: "ORD-2024-002",
    carDetails: {
      make: "Honda",
      model: "CR-V",
      year: 2023,
      images: []
    },
    status: "In Transit",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    date: "2024-04-05",
    estimatedDelivery: "2024-04-15"
  },
  {
    id: 3,
    orderId: "ORD-2024-003",
    carDetails: {
      make: "Ford",
      model: "F-150",
      year: 2022,
      images: []
    },
    status: "Processing",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
    date: "2024-04-10",
    estimatedDelivery: "2024-04-20"
  },
  {
    id: 4,
    orderId: "ORD-2024-004",
    carDetails: {
      make: "BMW",
      model: "X5",
      year: 2024,
      images: []
    },
    status: "Pending",
    shippingAddress: "321 Elm St, Houston, TX 77001",
    date: "2024-04-12",
    estimatedDelivery: "2024-04-22"
  }
];

export const shippingStatuses = [
  "Pending",
  "Processing",
  "In Transit",
  "Out for Delivery",
  "Delivered"
];

export const carStatuses = [
  "Available",
  "In Transit",
  "In Maintenance",
  "Sold"
];
