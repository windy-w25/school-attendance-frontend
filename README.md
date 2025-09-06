# School Attendance System

A simple Laravel 12 + React  project for managing student attendance.
Supports Admin and Teacher roles.

## Features

### Admin
Register students <br>
Register teachers <br>
View Student Report (daily records + summary) <br>
View Class Monthly Report <br>

### Teacher
Mark daily attendance for a class <br>
View Student Report (daily records + summary) <br>
View Class Monthly Report <br>

## Frontend Setup (React + Vite)

1) Go into frontend folder: <br>
cd school-attendance-web <br>
npm install <br>

2) Create .env file: VITE_API_URL=http://127.0.0.1:8000/api <br>

3) Run frontend: npm run dev  <br>
App runs at: http://127.0.0.1:5173 <br>


## Backend Setup (Laravel 12)

1) Clone the repo & install dependencies: <br>
composer install <br>
cp .env.example .env <br>
php artisan key:generate <br>

2) Configure .env for database: <br>
    DB_CONNECTION=mysql <br>
    DB_DATABASE=school_attendance <br>
    DB_USERNAME=root <br>
    DB_PASSWORD= <br>

3) Run migrations & seeders: <br>
php artisan migrate --seed <br>

This seeds two users: <br>

Admin: admin@school.com / password <br>
Teacher: teacher@school.com / password <br>

4) Start server: php artisan serve <br>


## Usage
### Admin Dashboard

Manage Students → Add/list students <br>
Manage Teachers → Add/list teachers <br>
Student Report → Enter student ID → view daily attendance + summary <br>
Class Report → Enter class name + month → view class attendance summary <br>

### Teacher Dashboard

Mark Attendance → Select class, pick date, mark present/absent → save <br>
Student Report → Enter student ID → view daily attendance + summary <br>
Class Report → Enter class name + month → view class attendance summary <br>





