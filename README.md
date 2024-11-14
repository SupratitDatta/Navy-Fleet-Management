# Navy Fleet Management System

A comprehensive Navy Fleet Management System that manages personnel, vessels, and mission data. This system includes secure role-based access control, allowing only qualified personnel to create and modify missions, assign crew, and add vessel information. Other personnel can access and update their own details or check their mission assignments.

---

## Features

- **Role-Based Access Control**: Only personnel with the rank of Rear Admiral or higher can create, modify, and assign missions or manage vessel data.
- **Personnel Management**: Track and update individual personnel details, including rank, assigned missions, and personal data.
- **Mission Management**: Create and assign missions to specific personnel and track the status and details of each mission.
- **Vessel Management**: Maintain detailed records for each vessel, including mission assignment, crew capacity, range, and other specifications.

---

## Tech Stack

- **Backend**: Java, Spring Boot
- **Database**: MySQL
- **Frontend**: React, Tailwind

---

## SQL Database Tables

### Personnel Table
- Stores personal details of navy personnel, including ID, rank, address, and mission assignment information.

### Vessel Table
- Holds vessel-specific data, such as ID, type, crew capacity, range, weight, and assigned mission details.

### Mission Table
- Contains mission details including ID, name, creator ID, assigned vessel, and mission objectives and requirements.

---

## Setup Instructions

### 1. **Clone the Repository**
    ```bash
    git clone https://github.com/SupratitDatta/Navy-Fleet-Management.git
    cd Navy-Fleet-Management
    ```

### 2. **Configure the Database**

- Create a MySQL database named `fleet`.
- Update the database credentials in `server/src/main/resources/application.properties`.
- Run your Database useing Xampp or MySQL Workbench

### 3. **Build and Run the Server**
- Run the FleetManagement.java in `server/src/main/java/backend/FleetManagement.java`.

### 4. **Build and Run the Frontend**
- In Client folder run:
    ```bash
    npm install
    npm start
    ```
### 5. **Access the Application**
- Navigate to http://localhost:3000 in your browser to see the Application.

## License

- This project is created by Supratit Datta in 2024. All rights reserved.
- Email ID - supratitdatta@gmail.com