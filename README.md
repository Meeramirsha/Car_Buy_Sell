# 🚗 Car Buy/Sell Platform

A comprehensive full-stack web application designed to facilitate the buying and selling of cars online. This platform provides a seamless user experience for browsing available vehicles, viewing detailed car information, and managing listings.

**[🎥 Watch Demo Video](#)**
*(Note: Please update this link with your actual video URL)*

---



## 🧱 Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | Angular            |
| Backend    | Spring Boot (Java) |
| Database   | MySQL              |
| API Tool   | Postman (optional) |

---

## ✨ Features
- **Browse Listings**: View a comprehensive list of cars available for sale.
- **Car Details**: Access detailed information about each vehicle, including Make, Model, Price, Fuel Type, Year, and Features.
- **Manage Listings**: Add, update, and delete car listings via secure RESTful APIs.
- **Responsive UI**: A modern interface built with Angular.

---

## ⚙️ Getting Started

### 🐘 1. Database Setup (MySQL)

1. Ensure MySQL is installed and running.
2. Create a new database named `carbackend_db` or import the provided SQL dump:
   ```bash
   mysql -u root -p carbackend_db < carbackend_db.sql
   ```
3. Update the database credentials in the backend application properties.

### 💻 2. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd carbackend
   ```
2. Open the project in your preferred IDE (e.g., IntelliJ IDEA, Eclipse, VS Code).
3. Ensure `application.properties` has the correct database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/carbackend_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
4. Run the Spring Boot application (`CarbackendApplication.java`).
5. The backend will start running at: `http://localhost:8080`

### 🌐 3. Frontend Setup (Angular)

1. Navigate to the frontend directory:
   ```bash
   cd car
   ```
2. Run the development server (if using Angular CLI):
   ```bash
   npm start
   ```
   *(Or simply serve the application using a live server or HTTP server).*
3. Ensure the backend API is running at `localhost:8080` for the frontend to fetch data.

---

## 🧪 API Endpoints

You can test the REST APIs using Postman or any other API client.

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | `/api/cars`      | List all cars        |
| POST   | `/api/cars`      | Add a new car        |
| PUT    | `/api/cars/{id}` | Update an existing car|
| DELETE | `/api/cars/{id}` | Delete a car         |

---

## 💡 Troubleshooting

- **Database Connection Issues**: Double-check the username, password, and database URL in `application.properties`.
- **Port Conflicts**: If port `8080` is already in use, update the server port in `application.properties` (e.g., `server.port=8081`) and update the frontend API calls accordingly.