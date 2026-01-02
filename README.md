# JobHunter CRM

> A full-stack MERN application to track job applications, visualize hiring pipelines, and organize application links in one dashboard.

## Tech Stack
* **Frontend:** React.js, Vite, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud)
* **Styling:** CSS3, Flexbox/Grid

## Features
* **Full CRUD Operations:** Create, Read, Update, and Delete job applications.
* **Pipeline Management:** One-click status updates (Planning → Applied → Interview → Offer).
* **Link Tracking:** Store and access direct links to job postings.
* **Date Stamping:** Automatically tracks when a job status was last updated.
* **Responsive Design:** Works on desktop and mobile.

## Demo Image:
<img width="1047" height="712" alt="Screenshot 2026-01-02 at 2 39 46 AM" src="https://github.com/user-attachments/assets/8e21ee31-be82-4af0-ac7d-ddd88c89ed6c" />

## Video Showcase:
https://imgur.com/fqeqpdv

## Local Setup
To run this project, you will need **two terminal windows** (one for the backend, one for the frontend).

### 1. Backend Setup (Terminal 1)
```bash
cd server
npm install

# Create a .env file in the /server folder and add:
# MONGO_URI=your_mongodb_connection_string
# PORT=5001

npm run dev
# Server runs on http://localhost:5001
```

### 2. Frontend Setup (Terminal 2)
```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

## End note
What i did:
* Designing a RESTful API with **Express** and **Mongoose**.
* Managing global state in **React** to reflect real-time database changes.

* Handling **CORS** policies between client and server.
* Structuring a **Monorepo** with separate concern layers.

