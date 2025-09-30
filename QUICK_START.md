# HealthifyMe - Quick Start Guide

Get your HealthifyMe fitness tracking app up and running in minutes!

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Expo Go app on your mobile device

## Quick Setup

### 1. Install Dependencies
```bash
# Run the setup script to install all dependencies
npm run setup
```

### 2. Set Up MongoDB
You have two options:

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- The app will connect to `mongodb://localhost:27017/healthifyme`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a cluster and get your connection string
- Update the `MONGODB_URI` in `healthifyme-backend/.env`

### 3. Start the Backend
```bash
cd healthifyme-backend
npm run dev
```
The backend will start on `http://localhost:5000`

### 4. Start the Frontend
```bash
cd healthifyme
npm start
```

### 5. Run on Your Device
- Install Expo Go from App Store/Google Play
- Scan the QR code that appears in your terminal
- The app will load on your device

## First Time Setup

1. **Register an Account**
   - Open the app
   - Tap "Sign Up"
   - Enter your email, password, and name
   - Complete the registration

2. **Complete Onboarding**
   - Set your fitness goals
   - Enter your personal information
   - Configure your baseline activity level

3. **Start Tracking**
   - Use the dashboard to view your progress
   - Log exercises and activities
   - Track your diet and calories
   - Monitor your progress over time

## Features to Try

### Authentication
- ✅ Register with email and password
- ✅ Login/logout functionality
- ✅ Secure JWT token authentication

### Dashboard
- ✅ View progress charts
- ✅ Track calories and steps
- ✅ See your fitness goals

### Exercise Tracking
- ✅ Watch exercise videos
- ✅ Log completed workouts
- ✅ Track calories burned
- ✅ View exercise history

### Data Persistence
- ✅ All data saved to MongoDB
- ✅ User profiles and preferences
- ✅ Activity and progress history

## Troubleshooting

### Backend Issues
- Make sure MongoDB is running
- Check the `.env` file configuration
- Verify port 5000 is available

### Frontend Issues
- Clear Expo cache: `expo r -c`
- Restart the development server
- Check your device's internet connection

### Database Issues
- Verify MongoDB connection string
- Check if the database exists
- Ensure proper network access

## API Testing

You can test the API endpoints using tools like Postman:

**Base URL:** `http://localhost:5000/api`

**Test Registration:**
```
POST /users/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}
```

**Test Login:**
```
POST /users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

## Next Steps

Once you have the basic app running, you can:

1. **Customize the UI** - Modify colors, layouts, and components
2. **Add More Features** - Implement additional tracking features
3. **Deploy to Production** - Set up cloud hosting and database
4. **Add Social Features** - Implement user connections and challenges
5. **Integrate Wearables** - Connect with fitness devices

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running and accessible
4. Check your network connection

For additional help, refer to the main README.md file or open an issue in the repository. 