# Flying Panda – Visa Slot Alerts Tool

A mini internal tool to track visa slot alerts for different countries and visa types.
Built as a simple full-stack application using Node.js, Express, MongoDB, and React.

# Features

Create visa slot alerts
View all alerts in a table
Update alert status (Active → Booked → Expired)
Delete alerts
Filter alerts using query params (country, status)
Input validation with Joi
Custom logger middleware
Centralized error handling
React frontend consuming the backend API

# Tech Stack

## Backend

Node.js
Express
MongoDB + Mongoose
Joi for input validation
CORS middleware

## Frontend
React (Vite)
Fetch API

# Setup Steps

1️⃣ Clone the repository

git clone (https://github.com/sudipta-khanra/flying_panda.git)
cd flying-panda

# 2️⃣ Backend Setup
cd backend
npm install

Start MongoDB locally, then run:
npm run dev

Backend runs on:
http://localhost:8080


#3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173


# API Endpoints
| Method | Endpoint      | Description                         |
| ------ | ------------- | ----------------------------------- |
| GET    | `/alerts`     | Fetch all alerts (supports filters) |
| POST   | `/alerts`     | Create a new alert                  |
| PUT    | `/alerts/:id` | Update alert status                 |
| DELETE | `/alerts/:id` | Delete an alert                     |

# Query Filters
GET /alerts?country=India
GET /alerts?status=Active

# Data Model (Alert)
{
  country: String,
  city: String,
  visaType: "Tourist" | "Business" | "Student",
  status: "Active" | "Booked" | "Expired",
  createdAt: Date
}

# Joi Schema Validation

Input validation is done using Joi for all create and update requests. This ensures that:
country and city are non-empty strings
visaType is one of "Tourist", "Business", or "Student"
status is one of "Active", "Booked", or "Expired" (default "Active") 

# Design Decisions
MVC-style structure used for backend (routes, controllers, models) for clarity and scalability.
MongoDB + Mongoose chosen for flexible schema and fast prototyping.
Logger middleware added globally to log all incoming requests.
Centralized error handling ensures consistent API error responses.
CORS middleware enabled to allow communication between React frontend and Express backend during development.
Frontend kept simple and functional, focusing on clarity rather than heavy styling.

# What I’d Improve for Production

Add authentication & authorization
Add input validation (Joi / Zod)
Implement pagination for large datasets
Use environment variables for DB URLs and allowed origins
Add API response standardization
Improve UI/UX with better styling and feedback states
Add tests (Jest / Supertest)


# Where AI Helped vs Where I Had to Think
## Where AI Helped

Boilerplate code setup
Reference for Express route structure
Debugging common issues like CORS configuration and middleware ordering

## Where I Had to Think

Designing the data model and API behavior
Structuring backend routes and controllers
Debugging real issues such as:
CORS preflight (OPTIONS) requests
Empty database states
Middleware execution order
Integrating frontend state updates with backend responses
Ensuring proper HTTP status codes and error handling