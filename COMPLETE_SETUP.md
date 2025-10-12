# 🎉 Smart Green City - Complete Setup Guide

## 📦 What You Have

### ✅ Frontend (React)
- **7 Pages:** Home, Login, Register, Report Issue, Track, Admin, Analytics, Green Tips, Air Quality
- **Authentication:** JWT-based with AuthContext
- **Routing:** React Router with protected routes
- **Styling:** Modern, responsive CSS
- **API Integration:** Complete service layer

### ✅ Backend (Node.js + Express)
- **REST API:** Full CRUD operations
- **Authentication:** JWT with bcrypt password hashing
- **Database:** MongoDB with Mongoose ODM
- **File Upload:** Multer for image handling
- **Security:** Helmet, CORS, rate limiting
- **Role-based Access:** Citizen and Admin roles

### ✅ Database (MongoDB)
- **User Model:** Authentication and profiles
- **Complaint Model:** Issue tracking with status history
- **Indexes:** Optimized queries
- **Relationships:** User-Complaint references

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install MongoDB

**Windows:**
```bash
# Download from mongodb.com/try/download/community
# Run installer → Complete installation
# Install as Windows Service
```

**Verify:**
```bash
mongod --version
```

### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your settings
# Minimum required:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-green-city
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:3000

# Start backend
npm run dev
```

**Expected output:**
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📍 Environment: development
🌐 API URL: http://localhost:5000/api
```

### Step 3: Setup Frontend

```bash
# Go back to project root
cd ..

# Install dependencies (if not already done)
npm install

# Start frontend
npm start
```

**Browser opens:** `http://localhost:3000`

---

## 🎯 Test the Complete System

### Test 1: Register & Login (2 minutes)

1. **Navigate to Register:** `http://localhost:3000/register`
2. **Fill form:**
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Phone: 1234567890
3. **Click Register**
4. **Verify:** You're logged in, name shows in navbar

### Test 2: Report an Issue (2 minutes)

1. **Click "Report Issue"** in navbar
2. **Fill form:**
   - Type: Garbage & Waste
   - Title: Overflowing bin
   - Description: Bin full for 3 days
   - Location: Main Street
   - Click "Get Current Location" (or enter manually)
   - Upload image (optional)
3. **Submit**
4. **Save Complaint ID** (e.g., CMP7X9K2L)

### Test 3: Track Complaint (1 minute)

1. **Click "Track"** in navbar
2. **Enter Complaint ID**
3. **Click Track**
4. **Verify:** See complaint details and progress timeline

### Test 4: Create Admin User (1 minute)

```bash
# Open MongoDB shell
mongo

# Switch to database
use smart-green-city

# Make your user admin
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { role: "admin" } }
)

# Exit
exit
```

**Refresh browser** - Admin link now visible in navbar

### Test 5: Admin Dashboard (2 minutes)

1. **Click "Admin"** in navbar
2. **View all complaints**
3. **Click a complaint**
4. **Update status** to "In Progress"
5. **Go back to Track page**
6. **Verify:** Status updated!

---

## 📁 Project Structure

```
firstweb/
├── backend/                    # Node.js Backend
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Complaint.js       # Complaint schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── complaints.js      # Complaint routes
│   │   └── users.js           # User management routes
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   └── upload.js          # File upload handling
│   ├── uploads/               # Uploaded images
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   ├── package.json           # Dependencies
│   ├── README.md              # Backend docs
│   └── SETUP_GUIDE.md         # Setup instructions
│
├── src/                        # React Frontend
│   ├── components/
│   │   └── Navigation.jsx     # Navbar with auth
│   ├── context/
│   │   └── AuthContext.js     # Auth state management
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ReportIssue.jsx
│   │   ├── TrackComplaint.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Analytics.jsx
│   │   ├── GreenTips.jsx
│   │   └── AirQuality.jsx
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── styles/
│   │   ├── home.css
│   │   ├── forms.css
│   │   ├── auth.css
│   │   ├── tracking.css
│   │   ├── admin.css
│   │   ├── analytics.css
│   │   ├── tips.css
│   │   └── airquality.css
│   ├── App.js                 # Main app with routing
│   ├── App.css                # Base styles
│   └── index.js               # Entry point
│
├── public/
│   └── index.html             # HTML template
│
├── BACKEND_INTEGRATION.md     # Integration guide
├── COMPLETE_SETUP.md          # This file
├── SMART_GREEN_CITY_README.md # Full documentation
├── QUICK_START.md             # Quick start guide
├── DEMO_GUIDE.md              # Feature walkthrough
└── package.json               # Frontend dependencies
```

---

## 🔑 Key Features

### Authentication
- ✅ JWT token-based authentication
- ✅ Secure password hashing (bcrypt)
- ✅ Protected routes
- ✅ Role-based access control
- ✅ Token expiration (7 days)
- ✅ Auto-login after registration

### Complaint Management
- ✅ Create complaints with images
- ✅ Geolocation support
- ✅ Unique complaint IDs
- ✅ Status tracking (4 stages)
- ✅ Status history
- ✅ Search by ID
- ✅ Filter by status/type

### Admin Features
- ✅ View all complaints
- ✅ Update complaint status
- ✅ Delete complaints
- ✅ User management
- ✅ Statistics dashboard
- ✅ Role management

### User Experience
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Real-time updates
- ✅ Error handling
- ✅ Loading states
- ✅ Success notifications

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "citizen" | "admin",
  phone: String,
  address: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaints Collection
```javascript
{
  _id: ObjectId,
  complaintId: String (unique, e.g., "CMP7X9K2L"),
  user: ObjectId (ref: User),
  type: String (enum),
  title: String,
  description: String,
  location: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  image: String (file path),
  status: "Pending" | "In Progress" | "Resolved" | "Rejected",
  priority: "Low" | "Medium" | "High" | "Critical",
  statusHistory: Array,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 API Endpoints

### Public Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/:id` - Get single complaint

### Protected Endpoints (Requires Login)
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updateprofile` - Update profile
- `PUT /api/auth/changepassword` - Change password
- `POST /api/complaints` - Create complaint
- `PUT /api/complaints/:id` - Update own complaint
- `DELETE /api/complaints/:id` - Delete own complaint

### Admin Only Endpoints
- `PUT /api/complaints/:id/status` - Update complaint status
- `GET /api/complaints/stats/overview` - Get statistics
- `GET /api/users` - Get all users
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user

---

## 🛠️ Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smart-green-city
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
```

### Frontend (.env - optional)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running: `net start MongoDB`
- Verify `.env` file exists in `backend/` folder
- Check port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check CORS settings in `backend/server.js`
- Clear browser cache and localStorage

### Login/Register not working
- Check MongoDB connection
- Verify JWT_SECRET is set in `.env`
- Check browser console for errors

### Image upload fails
- Ensure `backend/uploads/complaints/` folder exists
- Check file size (max 5MB)
- Verify file type (images only)

### Admin features not showing
- Make user admin in MongoDB (see Test 4 above)
- Logout and login again
- Check user role in AuthContext

---

## 📚 Documentation Files

1. **SMART_GREEN_CITY_README.md** - Complete frontend documentation
2. **backend/README.md** - Complete backend API documentation
3. **backend/SETUP_GUIDE.md** - Detailed backend setup
4. **BACKEND_INTEGRATION.md** - Integration guide
5. **QUICK_START.md** - Quick start for frontend
6. **DEMO_GUIDE.md** - Feature walkthrough
7. **COMPLETE_SETUP.md** - This file

---

## 🎓 Learning Resources

### Technologies Used
- **React:** reactjs.org
- **Node.js:** nodejs.org
- **Express:** expressjs.com
- **MongoDB:** mongodb.com
- **JWT:** jwt.io
- **Mongoose:** mongoosejs.com

### Tutorials
- React Router: reactrouter.com
- JWT Authentication: youtube.com/watch?v=mbsmsi7l3r4
- MongoDB CRUD: mongodb.com/docs/manual/crud
- File Upload with Multer: npmjs.com/package/multer

---

## 🚀 Next Steps

### Immediate
1. ✅ Test all features
2. ✅ Create admin user
3. ✅ Report multiple complaints
4. ✅ Test admin dashboard

### Short Term
- [ ] Add email notifications
- [ ] Implement password reset
- [ ] Add profile page
- [ ] Create complaint comments
- [ ] Add complaint assignment

### Long Term
- [ ] Deploy to production
- [ ] Add real-time updates (WebSockets)
- [ ] Implement map view
- [ ] Add mobile app
- [ ] Create analytics dashboard
- [ ] Add multi-language support

---

## 🎉 Congratulations!

You now have a **fully functional** Smart Green City application with:
- ✅ Complete authentication system
- ✅ Database integration
- ✅ File uploads
- ✅ Role-based access
- ✅ Admin dashboard
- ✅ Real-time tracking
- ✅ Production-ready architecture

**Start testing and building amazing features!** 🚀

---

**Need help? Check the other documentation files or create an issue!**
