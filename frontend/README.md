# Vyanic Email Marketing App

A full-stack email marketing web application built for Vyanic (vyanic.com).

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MySQL
- Email: Nodemailer + Gmail

## Features
- Add and manage email subscribers
- Create email campaigns
- Send campaigns to all subscribers
- Track campaign status

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/selvadhanush29/vyanic-email-marketing.git
cd vyanic-email-marketing

### 2. Backend Setup
cd backend
npm install
Create a .env file with:
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=vyanic_db
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password

### 3. Database Setup
Create MySQL database: vyanic_db
Run the following SQL:
CREATE TABLE subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  status ENUM('active','unsubscribed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  status ENUM('draft','sent') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### 4. Start Backend
npm run dev

### 5. Frontend Setup
cd ../frontend
npm install
npm run dev

### 6. Open App
http://localhost:5173

## API Endpoints
- GET  /api/subscribers — Get all subscribers
- POST /api/subscribers — Add new subscriber
- GET  /api/campaigns  — Get all campaigns
- POST /api/campaigns  — Create new campaign
- POST /api/email/send/:id — Send campaign