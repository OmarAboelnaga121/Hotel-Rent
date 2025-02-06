# Hotel Rental API  
A **GraphQL API** built with **NestJS** and **Prisma** to manage hotel bookings. This API allows users to browse hotels, book rooms, and manage reservations efficiently.

---

## Table of Contents  
1. [Installation](#installation)  
2. [Database Models](#database-models)  
3. [API Endpoints](#api-endpoints)  
4. [Contributing](#contributing)  
5. [License](#license)  

---

## Installation  

### 1. Requirements  
- **Node.js** >= 14  
- **PostgreSQL**  
- **Prisma**  
- **NestJS**  
- **GraphQL**  
- **Redis** (for caching and notifications)  

### 2. How to Run the App  
1. Run `npm install` to install all dependencies.  
2. Create a `.env` file for database connection.  
3. Run `npm run migrate:dev` to apply database migrations.  
4. Run `npm run prisma:generate` to generate Prisma client.  
5. Start the application with `npm run start:dev`.  
6. Start the database with `npm run start:db`.  

### How to Run Tests  
1. Create a `.env.test` file for the test database.  
2. Run `npm run migrate:test` to migrate the test database.  
3. Run `npm run prisma:test:deploy` to deploy models.  
4. Start end-to-end tests with `npm run test:e2e`.  

---

## Database Models  
The database consists of the following models:

1. **User Model** (Customers, Sellers, Admins, and Support Staff)  
2. **Hotel Model** (Includes hotels listed by sellers)  
3. **Room Model** (Represents hotel rooms with availability and pricing)  
4. **Booking Model** (Manages reservations and booking statuses)  
5. **Payment Model** (Tracks transactions and payment statuses)  
6. **Notification Model** (Handles user notifications)  

---

## API Endpoints  

### 1. Queries  
- **Get all hotels**: Accessible by all users.  
- **Get available rooms in a hotel**: Accessible by all users.  
- **Get user bookings**: Accessible by customers.  
- **Get all users**: Accessible only by admins.  

### 2. Mutations  
- **Create a booking**: Accessible by customers.  
- **Cancel a booking**: Accessible by customers and support.  
- **Add a new hotel**: Accessible by sellers and admins.  
- **Update room availability**: Accessible by sellers and admins.  
- **Process payments**: Accessible by customers.  

---

## Contributing
### 1. Getting Started
1. Fork the repository by clicking the **Fork** button at the top of this page.
2. Clone the forked repository to your local machine:
   `git clone https://github.com/your-username/hotel-rental-api.git`
3. Navigate to the project directory:
`cd hotel-rental-api`
4. Install dependencies:
`npm install`
5. Run the application locally:
`npm run start:dev`
### 2. How to Contribute
1. Reporting Issues:
    Search existing issues before creating a new one.
2. For bugs:
    1. provide steps to reproduce the issue, expected behavior, and actual behavior.
    2. Label the issue appropriately (e.g., bug, enhancement, question).
3. Proposing Features
    1. Open a new issue with the enhancement label.
    2. Provide details about the feature and its use case.
 4. Submitting Code:
    1. Create a new branch:
    `git checkout -b feature/your-feature`
    2. Make your changes and commit them:
    `git commit -m "Add your commit message here"`
    3. Push to the branch:
    `git push origin feature/your-feature`
    4. Open a pull request.
---    
   
# License
This project, Hotel Rental API, is developed by Omar Wael and is protected under copyright.

You are free to use, modify, and share the code, but proper attribution must be given to the original author. Redistribution of this project in any form must include the following information:

**Developer: Omar Wael** 

**Portfolio Link: [Omar Wael's Portfolio](https://omar-wael.netlify.app/)**

Unauthorized use of this work without proper credit is prohibited.
For further inquiries or permission requests, please contact me via the details provided in the portfolio link above.
