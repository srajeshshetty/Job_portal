Job Board Application (MERN Stack)
📌 Project Overview

This is a Job Board Application built using the MERN stack where:

Companies can post job listings.

Users can browse jobs with filters.

Applicants can upload resumes during applications.

Admins can manage job postings and applicants.

This project demonstrates file upload handling, admin vs user roles, filtering, and CRUD operations.

🚀 Tech Stack

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

File Uploads: Multer

🛠️ Features

✅ Job post form (title, company, type, location)

✅ Filter and search job listings

✅ Resume upload during application

✅ Role-based access (Admin vs Applicant)

✅ Admin panel for managing jobs

✅ Secure file storage with Multer

📂 Project Structure
Job-Board-Application/
│── backend/         # Express server, API routes, MongoDB models
│── frontend/        # React UI, components, pages
│── uploads/         # Resume uploads stored here
│── .env             # Environment variables
│── package.json     # Dependencies
│── README.md        # Project documentation

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/your-username/job-board-app.git
cd job-board-app

2️⃣ Install dependencies
cd backend && npm install
cd frontend && npm install

3️⃣ Setup environment variables (.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

4️⃣ Run the application
# Run backend
cd backend
npm start

# Run frontend
cd frontend
npm start


The app will be running at:

Frontend → http://localhost:3000

Backend → http://localhost:5000
