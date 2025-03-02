# 🌍 Globetrotter Backend

> The backend for **Globetrotter** - The Ultimate Travel Guessing Game!  
> Powered by **Node.js, Express, MongoDB, Redis, and Socket.io**, this backend handles game logic, user interactions, and real-time updates.

## 📌 Table of Contents

- [🛠️ Features](#features)
- [🚀 Installation](#installation)
- [📌 Environment Variables](#environment-variables)
- [▶️ Running the Server](#running-the-server)
- [🧪 Running Tests](#running-tests)
- [📂 Project Structure](#project-structure)
- [📌 API Endpoints](#api-endpoints)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

---

## 🛠️ Features

✅ **AI-enhanced destination dataset** – Uses a mix of AI tools and manual curation.  
✅ **Rate-limited API** – Protects against excessive requests.  
✅ **Real-time multiplayer support** – Powered by **Socket.io**.  
✅ **Robust validation** – Uses **Joi** for request validation.  
✅ **Secure & optimized** – Helmet, CORS, compression, and logging (Winston & Morgan).

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/ashvinck/globetrotter-backend.git
cd globetrotter-backend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

---

## 📌 Environment Variables

Create a `.env` file in the root directory and define the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/globetrotter
REDIS_URL=redis://localhost:6379
```

---

## ▶️ Running the Server

### Development Mode

```sh
npm run dev
```

### Production Mode

```sh
npm start
```

---

## 🧪 Running Tests

```sh
npm test
```

To run tests in watch mode:

```sh
npm run test:watch
```

---

## 📂 Project Structure

```
📦 globetrotter-backend
├── 📂 src
│   ├── 📂 config          # Database and environment configuration
│   ├── 📂 controllers     # Route handlers
│   ├── 📂 middleware      # Express middleware (auth, validation, rate limiting, etc.)
│   ├── 📂 models          # Mongoose models
│   ├── 📂 routes          # API routes
│   ├── 📂 services        # Business logic (game logic, scoring, AI integration, etc.)
│   ├── 📂 utils           # Helper functions (logging, error handling, etc.)
│   ├── index.js           # Main server file
├── .env                   # Environment variables
├── .gitignore             # Files to ignore in git
├── package.json           # Dependencies and scripts
├── README.md              # Documentation
```

---

## 📌 API Endpoints

### 🔹 Game Logic

- `GET /destinations/get/random` – Get random clues
- `POST /destinations/check-destination` – Check user selected destination is correct or not

### 🔹 Admin

- `GET  /destinations/get/all` – Retrieve all destination info.
- `POST /api/admin/add-destination` – Add new destinations.

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

---

## 📜 License

This project is licensed under the **ISC License**.

---

### 🚀 Happy Coding & Enjoy Exploring the World! 🌍🎉
