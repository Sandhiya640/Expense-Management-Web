1. Overview

The Expense Management System is a web-based application developed to manage personal and organizational financial activities through a centralized interface. The application provides modules for user management, expense tracking, income management, loan management, dashboards, reports, and master-data administration.

The project was developed as part of a 45-day Full Stack Developer internship at Rane Madras Limited – Steering and Linkage Division. The repository contains the web application source code and a database schema with fictional sample data for demonstration and development purposes.

2. Key Features

User Management – Manage application users, roles, employee codes, and account status.

Expense Management – Record and manage expenses with categories, expense types, dates, amounts, and remarks.

Income Management – Record income transactions and classify them using income types.

Loan Management – Maintain loan information including loan type, bank, amount, interest rate, tenure, EMI, due date, and status.

Dashboard – Provide a centralized view of relevant financial information.

Reports and Analytics – Support financial reporting and analysis through application data.

Master Data Management – Maintain expense categories, expense types, income types, and roles.

3. Technology Stack

Layer

Technology

Purpose

Frontend

React, JavaScript, CSS

Web user interface

Backend

Node.js, Express.js

REST API and application logic

Database

Microsoft SQL Server

Persistent application data

Development

VS Code, SQL Server tools

Development and database management

Version Control

Git, GitHub

Source-code management and collaboration

4. Application Architecture

The application follows a three-layer web architecture:

Frontend Layer – React-based web interface responsible for screens, forms, navigation, and user interaction.

Backend Layer – Node.js and Express.js server providing API endpoints, validation, business logic, and database communication.

Database Layer – Microsoft SQL Server storing users, master data, expenses, income, and loan transactions.

React Frontend  →  Express/Node.js API  →  Microsoft SQL Server

5. Project Structure

Expense-Management-Web/
├── frontend/
├── backend/
├── database/
│   ├── schema.sql
│   └── seed.sql
├── .env.example
├── .gitignore
└── README.md

6. Database

The repository provides database setup scripts so that the application can be recreated in a local SQL Server environment without sharing the original local database files.

Main database tables:

Mst_Expense_Category – Expense category master data.

Mst_Expense_Type – Expense type master data linked to categories.

Mst_Income_Type – Income type master data.

Mst_Role – Application role information.

Mst_User – User and role information.

Trn_Expense – Expense transactions.

Trn_Income – Income transactions.

trn_loan – Loan transactions.

The database/schema.sql file contains the table definitions, identity columns, primary keys, foreign-key relationships, data types, nullability, and default values. The database/seed.sql file contains fictional sample data for local development and demonstration.

7. Database Setup

Create the database in Microsoft SQL Server:

CREATE DATABASE Expense_Management;

Run the schema script:

database/schema.sql

Run the sample-data script:

database/seed.sql

The sample database content is intended only for development and demonstration. It does not contain the application's original company database files.

8. Environment Configuration

Create a local .env file in the backend directory using the repository's .env.example as a template. Do not commit the .env file to GitHub.

DB_USER=your_sql_server_username
DB_PASSWORD=your_sql_server_password
DB_SERVER=localhost
DB_DATABASE=Expense_Management
DB_PORT=1433

PORT=5001

The values above are placeholders. Actual database credentials must be configured locally by the person running the application.

9. Getting Started

Clone the repository:

git clone <repository-url>
cd Expense-Management-Web

Install frontend dependencies:

cd frontend
npm install

Install backend dependencies:

cd ../backend
npm install

Configure the local SQL Server database using database/schema.sql and database/seed.sql, then configure the backend environment variables.

Start the backend:

npm start

Start the frontend using the project's configured development command.

10. Application Flow

The user accesses the React web application through the browser.

The frontend sends requests to the Express.js backend through API endpoints.

The backend validates requests and performs the required application operations.

The backend communicates with Microsoft SQL Server.

The database returns the requested information to the backend.

The backend sends the response to the frontend for display.

11. Main Modules

Module

Description

User Management

User records, roles, employee codes, contact information, and account status.

Expense Management

Expense categories, expense types, transaction dates, amounts, and remarks.

Income Management

Income type classification and income transaction records.

Loan Management

Loan details, EMI information, interest rates, due dates, tenure, and status.

Dashboard

Centralized presentation of relevant financial information.

Reports & Analytics

Financial data reporting and analysis.

Master Data

Maintenance of categories, types, income types, and roles.

12. Security and Repository Practices

Environment files containing actual credentials are excluded from version control.

The repository contains .env.example with placeholder values only.

Database files such as .mdf, .ldf, and .bak are not included.

Database seed records are fictional/sample records intended for demonstration.

No company credentials, private keys, API tokens, or internal access information should be stored in the repository.

13. Internship Contribution

This project was completed as part of a 45-day Full Stack Developer internship at Rane Madras Limited – Steering and Linkage Division. The work involved developing a web-based expense management solution using a React frontend, Node.js/Express.js backend, and Microsoft SQL Server database.

14. Public Repository Disclaimer

The repository is prepared for portfolio, demonstration, and development purposes. The included database seed data is fictional/sample data. Private credentials, company-confidential information, and original database files are intentionally excluded from the repository.

15. Repository Contents

Frontend source code

Backend source code

Database schema

Fictional sample seed data

Environment-variable template

Git ignore configuration

Project documentation

16. Author

Sandhiya Palanikumar

Information Technology | Full Stack Development
