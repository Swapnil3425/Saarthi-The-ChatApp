<h1 align="center">Saarthi - The ChatApp</h1>

<p align="center">
  <strong>A modern, real-time messaging application built with the MERN stack and Socket.io.</strong>
</p>

## 🚀 Features

- **Real-time Messaging:** Lightning-fast message delivery and real-time user presence updates using Socket.io.
- **Secure Authentication:** User registration and login protected by JSON Web Tokens (JWT).
- **Media Uploads:** Seamless image sharing powered by Cloudinary.
- **Modern UI/UX:** Responsive, beautifully designed aesthetic using Tailwind CSS.
- **State Management:** Efficient global state management to handle complex real-time data flow.
- **Notifications:** Receive alerts for new messages when you are away.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Zustand / Redux (for state management)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-time Communication:** Socket.io
- **Cloud Storage:** Cloudinary (for profile pictures and image messages)

## 💻 Installation & Setup

To run this project locally, follow these steps:

### Prerequisites

You need to have the following installed on your machine:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (Local instance or MongoDB Atlas cluster)

### 1. Clone the repository

```bash
git clone https://github.com/Swapnil3425/Saarthi-The-ChatApp.git
cd Saarthi-The-ChatApp
```

### 2. Install Dependencies

You'll need to install dependencies for both the frontend (`client`) and backend (`server`) applications.

**For the Backend:**
```bash
cd server
npm install
```

**For the Frontend:**
```bash
cd ../client
npm install
```

### 3. Environment Variables

Check the `.env.example` files (if present) to see required variables. Or create `.env` files in both directories:

**In the `server` folder, create a `.env` file:**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**In the `client` folder, create a `.env` file:**
```env
VITE_BACKEND_URL=http://localhost:5000
```

### 4. Run the Application

Start both the backend server and frontend development server simultaneously.

**Start the Backend (from the `server` directory):**
```bash
npm run dev
```

**Start the Frontend (from the `client` directory):**
```bash
npm run dev
```

The application should now be running on `http://localhost:5173` (Frontend) and `http://localhost:5000` (Backend).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
