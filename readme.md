# NexMart — Full Stack E-Commerce Platform

A production-grade e-commerce platform built from scratch as a portfolio project, demonstrating end-to-end full stack development skills. NexMart is designed to function as a real-world online store and is structured to be sold as a white-label solution for small businesses.

---

## Purpose

This project was built to demonstrate practical, deployable full stack development — not just academic exercises. The goal was to build something real: a working store with a proper admin system, authentication, order management, and a polished UI. Every feature was chosen because it reflects how actual e-commerce platforms work in production.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Backend | .NET 10 Web API, Entity Framework Core |
| Database | PostgreSQL 18 |
| Authentication | JWT Tokens, BCrypt password hashing |
| API Documentation | Swagger UI |
| Deployment | Vercel (Frontend), Railway (Backend) |

---

## Features

### Customer Side
- Browse products with search, category filter, and price sorting
- Product detail pages with full description and images
- Add to cart, update quantity, remove items
- Checkout with shipping details and Cash on Delivery
- Order history with real-time status tracking
- User registration and login with JWT authentication

### Admin Dashboard
- Dashboard stats — total products, orders, and revenue
- Full product management — add, view, delete products
- Order management — view all orders, update delivery status
- Contact messages — view and manage customer inquiries

### General
- FAQ, Shipping Policy, Returns Policy, and Contact pages
- Contact form that saves messages to the database
- Fully responsive design
- Protected routes based on user role (admin/customer)

---

## Project Structure
nexmart/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/       # Pages and routes
│   │   └── components # Reusable components
│   └── public/
├── backend/           # .NET Web API
│   ├── Controllers/   # API endpoints
│   ├── Models/        # Database models
│   ├── Data/          # DbContext
│   ├── DTOs/          # Data transfer objects
│   └── Migrations/    # Database migrations
└── README.md

---

## Getting Started Locally

### Prerequisites
- Node.js 18+
- .NET 10 SDK
- PostgreSQL 18
- Git

### 1. Clone the repository
```bash
git clone https://github.com/abdullah-codes-tech/Nexmart.git
cd Nexmart
```

### 2. Set up the database
```bash
psql -U postgres
CREATE DATABASE nexmart;
CREATE USER nexmart_user WITH PASSWORD 'nexmart123';
GRANT ALL PRIVILEGES ON DATABASE nexmart TO nexmart_user;
\q
```

### 3. Run the backend
```bash
cd backend
dotnet ef database update
dotnet run
```
Backend runs on `http://localhost:5278`
Swagger UI available at `http://localhost:5278/swagger`

### 4. Run the frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/Auth/register | Register a new user |
| POST | /api/Auth/login | Login and receive JWT token |
| GET | /api/Products | Get all products |
| POST | /api/Products | Create a product (admin) |
| DELETE | /api/Products/{id} | Delete a product (admin) |
| GET | /api/Orders | Get all orders (admin) |
| POST | /api/Orders | Place a new order |
| GET | /api/Orders/myorders | Get current user's orders |
| PUT | /api/Orders/{id}/status | Update order status (admin) |
| POST | /api/Contact | Submit a contact message |
| GET | /api/Contact | Get all messages (admin) |

---

## Developer

Built by **Muhammad Abdullah** — BSIT student at Bahria University Islamabad.

This project represents real full stack development work including database design, REST API architecture, JWT authentication, and modern frontend development with Next.js.

- GitHub: [github.com/abdullah-codes-tech](https://github.com/abdullah-codes-tech)

---

## License

This project is open source and available for educational and portfolio purposes.