# GameCenter Club

This is the frontend application for the GameCenter platform, built with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management & Data Fetching**: Redux Toolkit & RTK Query
- **Routing**: React Router DOM
- **Authentication**: JWT & Google OAuth
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **Icons**: Lucide React

## 📋 Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

## 🛠️ Project Setup & Installation

**1. Navigate to the frontend directory:**
```bash
cd gamecenterclub-website
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up Environment Variables:**
Create a `.env` file in the root of the `gamecenterclub-website` directory. Ask your team for the necessary keys, or use the following template:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api
VITE_BASE_URL=http://localhost:8000

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
VITE_GOOGLE_CLIENT_REDIRECT_URI=http://localhost:5173/auth/google/google-callback/oauth/login

# Firebase Configuration (for Push Notifications)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_FIREBASE_VAPID_KEY=your_firebase_vapid_key
```

**4. Start the development server:**
```bash
npm run dev
```

The application will start running on `http://localhost:5173`.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
- `npm run lint`: Runs ESLint to analyze the code and find problems.
- `npm run preview`: Boots up a local static web server that serves the files from `dist` to preview the production build locally.

## 🔗 Backend Connection

This frontend application relies on the `gamecenter-node-backend` server. 
To ensure full functionality (login, games fetching, etc.), make sure the backend server is running concurrently:

1. Open a new terminal.
2. Navigate to the backend folder: `cd ../gamecenter-node-backend`
3. Start the backend server: `npm run dev` (It usually runs on port 8000).

---

*- GameCenter Club Development Team*
