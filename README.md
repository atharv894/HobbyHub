# HobbyHub - Connect, Learn, and Share Your Passion

A full-stack web application for hobby enthusiasts to connect, participate in events, engage in real-time chatrooms, and share learning resources.

## 🚀 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Realtime**: Socket.io
- **Authentication**: JWT (httpOnly cookies)

## 📋 Features

- ✅ JWT-based authentication (Sign up, Login, Logout)
- ✅ Hobby selection after signup
- ✅ Personal dashboard with profile and events
- ✅ Real-time chatrooms for each hobby
- ✅ Event hosting and joining
- ✅ Resource sharing system
- ✅ Responsive design (mobile-first)

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Hobbyhub
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set Up MongoDB**

   **Quick Start (Recommended):** Use MongoDB Atlas (cloud) - see `MONGODB_SETUP.md` for detailed instructions.

   **Quick Steps:**
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
   - Create a cluster, database user, and whitelist your IP
   - Get your connection string from the "Connect" button

4. **Environment Variables**

   Create a `.env` file in the `server` directory:
   
   **For MongoDB Atlas (Cloud):**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hobbyhub?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLIENT_URL=http://localhost:5173
   PORT=5000
   ```
   
   **For Local MongoDB:**
   ```env
   MONGO_URI=mongodb://localhost:27017/hobbyhub
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLIENT_URL=http://localhost:5173
   PORT=5000
   ```

   **📖 Detailed MongoDB setup instructions:** See `MONGODB_SETUP.md`

   Optionally, create a `.env` file in the `client` directory for production:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Start Development Servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend on `http://localhost:5173`
   - Backend on `http://localhost:5000`

## 📁 Project Structure

```
Hobbyhub/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── server.js          # Entry point
│   └── package.json
└── package.json           # Root package.json
```

## 🔐 Authentication Flow

1. User signs up with email and password
2. After signup, user is redirected to hobby selection
3. User selects their hobbies
4. User is redirected to dashboard
5. JWT token is stored in httpOnly cookies and localStorage

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `PUT /api/users/hobbies` - Update user hobbies

### Events
- `GET /api/events` - Get all events (optional ?hobby= filter)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `POST /api/events/:id/join` - Join an event
- `POST /api/events/:id/leave` - Leave an event

### Chat
- `GET /api/chat/hobbies` - Get list of hobbies
- `GET /api/chat/:hobby` - Get messages for a hobby

### Resources
- `GET /api/resources` - Get all resources (optional ?hobby= filter)
- `GET /api/resources/:id` - Get resource by ID
- `POST /api/resources` - Create new resource
- `DELETE /api/resources/:id` - Delete resource

## 🚢 Deployment on Render

### Backend Deployment

1. Create a new **Web Service** on Render
2. Connect your repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string
   - `CLIENT_URL` - Your frontend URL (e.g., `https://hobbyhub-client.onrender.com`)
   - `PORT` - `5000` (Render will provide `PORT` env var automatically)
   - `NODE_ENV` - `production`

### Frontend Deployment

1. Create a new **Static Site** on Render
2. Connect your repository
3. Set build command: `cd client && npm install && npm run build`
4. Set publish directory: `client/dist`
5. Add environment variable:
   - `VITE_API_URL` - Your backend URL (e.g., `https://hobbyhub-server.onrender.com`)

### MongoDB Setup

- Use MongoDB Atlas (free tier available)
- Get your connection string
- Add it to your backend environment variables

## 📝 Available Scripts

- `npm run dev` - Start both client and server concurrently
- `npm run server` - Start backend server only
- `npm run client` - Start frontend dev server only
- `npm run build` - Build frontend for production
- `npm run install-all` - Install dependencies for root, server, and client

## 🎨 Features Overview

### Homepage
- Hero section
- Features showcase
- About section
- Benefits section
- Testimonials
- Call-to-action

### Dashboard
- User profile information
- Selected hobbies
- Hosted events
- Joined events
- Quick link to host new event

### Chatrooms
- Browse all hobby chatrooms
- Highlight user's selected hobbies
- Real-time messaging with Socket.io

### Events
- Browse all events
- Filter by hobby
- Host new events
- Join/leave events
- View event details

### Resources
- Browse learning resources
- Filter by hobby
- Share new resources
- Delete own resources

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string
- Verify network access in MongoDB Atlas if using cloud

### CORS Errors
- Ensure `CLIENT_URL` in server `.env` matches your frontend URL
- Check that credentials are enabled in axios requests

### Socket.io Connection Issues
- Verify the socket URL in `Chatroom.jsx`
- Check that the backend Socket.io server is running
- Ensure CORS is properly configured for Socket.io

## 📧 Support

For issues and questions, please open an issue on the repository.

