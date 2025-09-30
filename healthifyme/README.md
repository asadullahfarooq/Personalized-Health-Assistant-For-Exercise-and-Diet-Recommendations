# HealthifyMe - Fitness Tracking App

A comprehensive React Native fitness tracking application with a Node.js/Express backend. Track your calories, steps, exercises, diet, and progress towards your fitness goals.

## Features

### Frontend (React Native)
- ✅ User authentication (login/signup)
- ✅ Onboarding flow
- ✅ Dashboard with charts and progress tracking
- ✅ Calories tracking with different time frames
- ✅ Steps counting
- ✅ Progress monitoring
- ✅ Exercise recommendations
- ✅ Diet recommendations
- ✅ User profile management
- ✅ Goal setting and tracking

### Backend (Node.js/Express)
- ✅ User authentication with JWT
- ✅ User profile management
- ✅ Goals tracking
- ✅ Activities logging
- ✅ Diet entries
- ✅ Progress tracking
- ✅ MongoDB database integration

## Tech Stack

### Frontend
- React Native
- Expo
- React Navigation
- React Native Chart Kit
- AsyncStorage
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Expo CLI
- React Native development environment

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd healthifyme
```

### 2. Backend Setup

```bash
cd healthifyme-backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/healthifyme
JWT_SECRET=your-secret-key-here
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd healthifyme
npm install
```

Start the Expo development server:
```bash
npm start
```

## Project Structure

```
healthifyme/
├── healthifyme/                 # React Native frontend
│   ├── assets/                  # Images and media files
│   ├── components/              # Reusable components
│   ├── context/                 # React Context (AuthContext)
│   ├── pages/                   # Screen components
│   ├── services/                # API services
│   ├── App.js                   # Main app component
│   └── package.json
├── healthifyme-backend/         # Node.js backend
│   ├── middleware/              # Authentication middleware
│   ├── models/                  # MongoDB schemas
│   ├── routes/                  # API routes
│   ├── server.js                # Express server
│   └── package.json
└── src/
    └── config/                  # Configuration files
        ├── api.js               # API configuration
        └── firebase.js          # Firebase config (optional)
```

## API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### User Profile
- `GET /api/users/profile` - Get user profile
- `POST /api/users/profile` - Update user profile

### Goals
- `PUT /api/users/goals` - Update user goals

### Activities
- `GET /api/users/activities` - Get user activities
- `POST /api/users/activities` - Add new activity

### Diet
- `GET /api/users/diet` - Get diet entries
- `POST /api/users/diet` - Add diet entry

### Progress
- `GET /api/users/progress` - Get progress data
- `POST /api/users/progress` - Add progress entry

## Usage

### 1. Authentication
- Users can register with email, password, and name
- Login with email and password
- JWT tokens are used for authentication

### 2. Onboarding
- After registration, users go through an onboarding flow
- Set fitness goals and personal information
- Configure baseline activity levels

### 3. Dashboard
- View progress charts and statistics
- Track calories, steps, and overall progress
- Access exercise and diet recommendations

### 4. Tracking Features
- Log daily activities and exercises
- Track food intake and calories
- Monitor weight and body measurements
- View progress over time

## Development

### Running in Development Mode

1. Start the backend server:
```bash
cd healthifyme-backend
npm run dev
```

2. Start the frontend:
```bash
cd healthifyme
npm start
```

3. Use Expo Go app on your mobile device or run on simulator/emulator

### Environment Variables

Backend `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/healthifyme
JWT_SECRET=your-secret-key-here
PORT=5000
```

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas or other cloud database
2. Deploy to Heroku, Vercel, or similar platform
3. Update environment variables
4. Update frontend API base URL

### Frontend Deployment
1. Build the app using Expo:
```bash
expo build:android
expo build:ios
```

2. Or use EAS Build:
```bash
eas build --platform all
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

## Future Enhancements

- [ ] Social features (friends, challenges)
- [ ] Workout plans and routines
- [ ] Nutrition database integration
- [ ] Wearable device integration
- [ ] Push notifications
- [ ] Offline mode
- [ ] Data export functionality
- [ ] Advanced analytics and insights 