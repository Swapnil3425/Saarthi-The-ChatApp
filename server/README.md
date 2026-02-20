# Saarthi - Your Own Messenger

Saarthi is a full-stack, real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js). Enjoy seamless real-time messaging, profile customization, and secure authentication in a beautifully designed interface.

## 🚀 Features

- **Real-time Messaging**: Powered by `Socket.io` for instantaneous chat delivery and dynamic online/offline user statuses.
- **Secure Authentication**: Robust JWT-based authentication system with password hashing using `bcryptjs`.
- **Media Support**: Send image messages and upload custom avatars, handled efficiently through `Cloudinary` cloud storage.
- **Responsive UI**: Built with React and styled beautifully with TailwindCSS, providing a "Cyber-Cyan" premium aesthetic.
- **RESTful API**: Clean, scalable backend routing using Express.js.

## 💻 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React-Router-DOM, Axios
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB & Mongoose
- **Cloud Storage**: Cloudinary (Image Hosting)
- **Deployment**: Configured to run locally and deploy to platforms like Vercel and Render.

## 🛠️ Installation & Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-github-repo-url>
   cd Saarthi
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Variables Config**:
   Create a `.env` file in your `server` directory and add the following keys:
   ```env
   MONGODB_URI=your_mongodb_cluster_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret

   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Run the Application**:

   Open two terminal windows.
   - Run Backend (`cd server`): `npm start` (or `node server.js`)
   - Run Frontend (`cd client`): `npm run dev`

   Access the application in your browser at `http://localhost:5173`.

---

## 📦 Core NPM Packages Overview

### Backend (`server/package.json`)
- **`bcryptjs`**: Hashes user passwords securely in the MongoDB database.
- **`cloudinary`**: SDK for managing and uploading messaging media/profile pictures to the cloud.
- **`cors`**: Enables cross-origin requests, allowing the React frontend to communicate securely with the API.
- **`dotenv`**: Safely loads sensitive environment variables from the `.env` file.
- **`express`**: Lightweight flexbile Node.js framework for handling application routing.
- **`jsonwebtoken`**: Issues and verifies tokens for secure, stateless user sessions.
- **`mongoose`**: Provides strict schema validation and query wrapping for our MongoDB cluster.
- **`socket.io`**: The backbone of real-time communication, establishing the WebSocket layer.

### Frontend (`client/package.json`)
- **`react` & `react-dom`**: The core component-based framework for rendering the UI.
- **`react-router-dom`**: Handles client-side navigation (Login, Signup, Chat, Profile screens).
- **`axios`**: Simplified HTTP client for triggering backend actions efficiently.
- **`tailwindcss` & `@tailwindcss/vite`**: Utility-first styling framework enabling rapid prototyping.
- **`socket.io-client`**: Links directly with the backend's socket server to broadcast and receive chats.
- **`react-hot-toast`**: Lightweight push notification popups for success/error feedback.

## 👨‍💻 Project Structure

```
Saarthi/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── assets/         # Images, icons, and dummy data
│   │   ├── components/     # Reusable UI React components (ChatContainer, SideBar, SaarthiLogo)
│   │   ├── context/        # State Management (AuthContext & ChatContext)
│   │   ├── lib/            # Axios interceptor setups
│   │   ├── pages/          # Full page views (Home, Login, Profile)
│   │   └── App.jsx         # Routing entrypoint
│   └── package.json
└── server/                 # Node.js/Express Backend
    ├── controllers/        # Route handler functions
    ├── lib/                # Config logic (MongoDB, Cloudinary, Token Gen)
    ├── middleware/         # Custom authentication protection (auth.js)
    ├── models/             # Mongoose schemas (User, Message)
    ├── routes/             # Express API endpoints
    ├── server.js           # Server entrypoint
    └── package.json
```

