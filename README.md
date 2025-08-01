---

# 📚 Library Management System

A full-stack web application for managing books, readers, and lending transactions in a library.
Built with a **React (TypeScript)** frontend and a **Node.js/Express** backend.

---

## 🚀 Tech Stack

### 🖥️ Frontend

* ⚛️ React (with TypeScript)
* 💨 Tailwind CSS
* 🔁 React Router
* 🔔 Toastify (for alerts)
* 🌐 Axios (API requests)

### 🖥️ Backend

* 🟢 Node.js
* 🚂 Express.js
* 🍃 MongoDB (Mongoose)
* 🔗 RESTful APIs

---

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/HansakaV/library-system.git
cd library-system
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### 3. Backend Setup

```bash
cd backend
npm install
npm run dev
```

> 📝 **Important:**
> Create a `.env` file inside the `backend` folder with your environment variables. At minimum, set:

```env
MONGODB_URI=your-mongodb-uri
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASS=your-app-password
EMAIL_FROM=library@example.com
```

---

## ☁️ Deployment Instructions

### 🔵 Frontend on Vercel

1. Go to [Vercel](https://vercel.com/) and log in with GitHub.
2. Click **"New Project"**, then **import your GitHub repo**.
3. Set the **project root** to `frontend/`.
4. Confirm the detected settings (React app).
5. Click **Deploy** 🎉

---

### 🟣 Backend on Railway

1. Go to [Railway](https://railway.app/) and log in.
2. Click **"New Project" → "Deploy from GitHub Repo"**.
3. Set the **project root** to `backend/`.
4. Add required environment variables:

   * `MONGODB_URI`
   * `EMAIL_USER`, `EMAIL_PASS`, etc.
5. Deploy and copy the backend **live API URL**.

> 🔁 Update the frontend `.env` file with:

```env
VITE_API_BASE_URL=https://your-backend-url.up.railway.app
```

---

## 📁 Project Structure

```
library-system/
├── backend/           # Node.js + Express API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/          # React + TypeScript App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
└── README.md
```

---

## ✨ Features

* 📚 **Books**: Add, edit, delete books
* 👤 **Readers**: Manage reader details
* 🔄 **Transactions**: Issue and return books
* 🕒 **Overdue Tracking**: See which books are overdue
* 📊 **Dashboard**: Summary metrics and responsive charts
* 📬 **Email Notifications**: Send reminders for overdue books
* 🌐 **Deployed**: Vercel (frontend) + Railway (backend)

---

## 👨‍💻 Author

**Mahesh Hansaka**

📫 Reach me on:

* [GitHub](https://github.com/orion343dream)
* [LinkedIn](https://linkedin.com/in/your-profile)

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

---
