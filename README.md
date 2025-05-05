# Exercise Tracker

## Overview
The **Exercise Tracker** is a Node.js application that allows users to create profiles, log exercises, and retrieve exercise logs with optional filters. This project is part of the freeCodeCamp APIs and Microservices certification.

## Features
- **Create a User**: Add a new user with a unique ID.
- **Log Exercises**: Add exercises for a specific user, including a description, duration, and optional date.
- **Retrieve Exercise Logs**: Fetch a user's exercise log with optional filters for date range (`from`, `to`) and a limit on the number of results.

## Endpoints

### 1. `POST /api/users`
Create a new user.

#### Request Body:
```json
{
  "username": "example_user"
}
```

#### Response:
```json
{
  "username": "example_user",
  "_id": "1"
}
```

---

### 2. `GET /api/users`
Retrieve a list of all users.

#### Response:
```json
[
  {
    "username": "example_user",
    "_id": "1"
  }
]
```

---

### 3. `POST /api/users/:_id/exercises`
Log an exercise for a specific user.

#### Request Body:
```json
{
  "description": "Running",
  "duration": 30,
  "date": "2025-05-01" // Optional, defaults to current date
}
```

#### Response:
```json
{
  "username": "example_user",
  "description": "Running",
  "duration": 30,
  "date": "Thu May 01 2025",
  "_id": "1"
}
```

---

### 4. `GET /api/users/:_id/logs?[from][&to][&limit]`
Retrieve a user's exercise log with optional filters.

#### Query Parameters:
- `from` (optional): Start date in `yyyy-mm-dd` format.
- `to` (optional): End date in `yyyy-mm-dd` format.
- `limit` (optional): Maximum number of results to return.

#### Response:
```json
{
  "username": "example_user",
  "count": 2,
  "_id": "1",
  "log": [
    {
      "description": "Running",
      "duration": 30,
      "date": "Thu May 01 2025"
    },
    {
      "description": "Cycling",
      "duration": 45,
      "date": "Fri May 02 2025"
    }
  ]
}
```