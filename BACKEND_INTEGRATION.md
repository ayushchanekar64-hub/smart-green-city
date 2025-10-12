# 🔗 Backend Integration Guide

Complete guide to connect your React frontend with the Node.js backend.

## 📋 Prerequisites

- ✅ Backend server running on `http://localhost:5000`
- ✅ MongoDB connected
- ✅ Frontend running on `http://localhost:3000`

---

## 🚀 Quick Start

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smart-green-city
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
```

### Step 3: Start Backend

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Step 4: Start Frontend

```bash
# In project root (not backend folder)
npm start
```

---

## 🎯 Complete Integration Flow

### 1. Register a New User

**Frontend:** Navigate to `/register`

1. Fill in the registration form:
   - Name: John Doe
   - Email: john@example.com
   - Password: test123
   - Phone: 1234567890

2. Click "Register"

3. **What happens:**
   - Frontend sends POST to `/api/auth/register`
   - Backend creates user in MongoDB
   - Backend returns JWT token
   - Frontend stores token in localStorage
   - User is automatically logged in
   - Redirected to home page

**Verify in MongoDB:**
```bash
mongo
use smart-green-city
db.users.find().pretty()
```

### 2. Login

**Frontend:** Navigate to `/login`

1. Enter credentials
2. Click "Login"
3. Token stored, user logged in

### 3. Report an Issue (Authenticated)

**Frontend:** Navigate to `/report` (must be logged in)

1. Fill complaint form
2. Upload image (optional)
3. Click "Get Current Location" or enter manually
4. Submit

**What happens:**
- FormData sent to `/api/complaints`
- Image uploaded to `backend/uploads/complaints/`
- Complaint saved in MongoDB with user reference
- Unique complaint ID generated
- Success screen shows ID

**Verify:**
```bash
db.complaints.find().pretty()
```

### 4. Track Complaint

**Frontend:** Navigate to `/track`

1. Enter complaint ID (e.g., CMP7X9K2L)
2. Click "Track"

**What happens:**
- GET request to `/api/complaints/:id`
- Backend finds complaint by complaintId
- Returns full complaint with user details
- Progress timeline displayed

### 5. Admin Dashboard

**First, create admin user:**

```bash
mongo
use smart-green-city
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { role: "admin" } }
)
```

**Frontend:** Navigate to `/admin` (admin only)

1. View all complaints
2. Filter by status
3. Click complaint to view details
4. Update status
5. Delete if needed

**What happens:**
- GET `/api/complaints` with admin token
- Returns all complaints (not just user's)
- PUT `/api/complaints/:id/status` to update
- Status history tracked in database

---

## 🔐 Authentication Flow

### Token Management

**Login/Register:**
```javascript
// Backend returns
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}

// Frontend stores
localStorage.setItem('token', token);
```

**Authenticated Requests:**
```javascript
// Frontend adds header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Backend verifies
const decoded = jwt.verify(token, JWT_SECRET);
req.user = await User.findById(decoded.id);
```

**Logout:**
```javascript
// Frontend removes token
localStorage.removeItem('token');
```

---

## 📡 API Integration Examples

### Example 1: Register User

**Frontend Code:**
```javascript
import { authAPI, setToken } from '../services/api';

const handleRegister = async (userData) => {
  try {
    const response = await authAPI.register(userData);
    setToken(response.token);
    // User is now logged in
  } catch (error) {
    console.error(error.message);
  }
};
```

**Backend Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67890abcdef",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

### Example 2: Create Complaint with Image

**Frontend Code:**
```javascript
import { complaintAPI } from '../services/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('type', 'Garbage & Waste');
  formData.append('title', 'Overflowing bin');
  formData.append('description', 'Bin full for 3 days');
  formData.append('location', 'Main Street');
  formData.append('latitude', '40.7128');
  formData.append('longitude', '-74.0060');
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  try {
    const response = await complaintAPI.create(formData);
    console.log('Complaint ID:', response.complaint.complaintId);
  } catch (error) {
    console.error(error.message);
  }
};
```

**Backend Response:**
```json
{
  "success": true,
  "message": "Complaint submitted successfully",
  "complaint": {
    "complaintId": "CMP7X9K2L",
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "type": "Garbage & Waste",
    "title": "Overflowing bin",
    "description": "Bin full for 3 days",
    "location": {
      "address": "Main Street",
      "coordinates": {
        "latitude": 40.7128,
        "longitude": -74.006
      }
    },
    "image": "/uploads/complaints/complaint-1234567890-abc.jpg",
    "status": "Pending",
    "createdAt": "2025-10-10T16:00:00.000Z"
  }
}
```

### Example 3: Update Status (Admin)

**Frontend Code:**
```javascript
const handleUpdateStatus = async (complaintId, newStatus) => {
  try {
    await complaintAPI.updateStatus(
      complaintId, 
      newStatus, 
      'Status updated by admin'
    );
    // Refresh complaints list
  } catch (error) {
    console.error(error.message);
  }
};
```

---

## 🗄️ Data Flow

### User Registration Flow
```
Frontend (Register.jsx)
    ↓ POST /api/auth/register
Backend (auth.js)
    ↓ Hash password
MongoDB (users collection)
    ↓ User created
Backend
    ↓ Generate JWT
Frontend
    ↓ Store token
    ↓ Update AuthContext
Navigation (show user name)
```

### Complaint Creation Flow
```
Frontend (ReportIssue.jsx)
    ↓ POST /api/complaints (FormData)
Backend (complaints.js)
    ↓ Verify JWT token
    ↓ Upload image (multer)
    ↓ Save to uploads/
MongoDB (complaints collection)
    ↓ Complaint created
Backend
    ↓ Return complaint with ID
Frontend
    ↓ Show success screen
```

### Status Update Flow
```
Frontend (AdminDashboard.jsx)
    ↓ PUT /api/complaints/:id/status
Backend (complaints.js)
    ↓ Verify admin role
    ↓ Update complaint
    ↓ Add to statusHistory
MongoDB
    ↓ Status updated
Backend
    ↓ Return updated complaint
Frontend
    ↓ Refresh UI
```

---

## 🔧 Environment Configuration

### Frontend (.env in root)

Create `.env` in project root:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Usage:**
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Backend (.env in backend/)

Already created, ensure it has:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-green-city
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error

**Error:**
```
Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solution:**
Check `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
```

Verify `CLIENT_URL` in `backend/.env`:
```env
CLIENT_URL=http://localhost:3000
```

### Issue 2: 401 Unauthorized

**Error:** "Not authorized to access this route"

**Solutions:**
1. Check if token exists: `localStorage.getItem('token')`
2. Verify token format in request header
3. Check if token expired (login again)
4. Ensure JWT_SECRET matches between requests

### Issue 3: Image Upload Fails

**Error:** "Only image files are allowed"

**Solutions:**
1. Check file type (JPEG, PNG, GIF, WEBP only)
2. Verify file size (max 5MB)
3. Ensure `backend/uploads/complaints/` folder exists
4. Check FormData is sent correctly (no Content-Type header)

### Issue 4: MongoDB Connection Failed

**Error:** "MongooseServerSelectionError"

**Solutions:**
1. Start MongoDB: `net start MongoDB` (Windows)
2. Check connection string in `.env`
3. Verify MongoDB is running: `mongo` command
4. For Atlas: Check IP whitelist

### Issue 5: Port Already in Use

**Error:** "EADDRINUSE: address already in use :::5000"

**Solutions:**
```bash
# Find process
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

---

## ✅ Testing Checklist

### Backend Tests
- [ ] Health check: `GET http://localhost:5000/api/health`
- [ ] Register user: `POST /api/auth/register`
- [ ] Login: `POST /api/auth/login`
- [ ] Get profile: `GET /api/auth/me` (with token)
- [ ] Create complaint: `POST /api/complaints` (with token)
- [ ] Get complaints: `GET /api/complaints`
- [ ] Update status: `PUT /api/complaints/:id/status` (admin)

### Frontend Tests
- [ ] Register page works
- [ ] Login page works
- [ ] User name shows in navbar after login
- [ ] Report Issue page (requires login)
- [ ] Image upload works
- [ ] Track complaint by ID
- [ ] Admin dashboard (admin only)
- [ ] Status update works
- [ ] Logout works

### Integration Tests
- [ ] Register → Auto login → Redirects to home
- [ ] Login → Token stored → User data loaded
- [ ] Report issue → Complaint created → ID returned
- [ ] Track → Complaint found → Details displayed
- [ ] Admin update → Status changed → UI refreshed
- [ ] Logout → Token removed → Redirects to home

---

## 📊 Database Verification

### View Users
```bash
mongo
use smart-green-city
db.users.find().pretty()
```

### View Complaints
```bash
db.complaints.find().pretty()
```

### Count Documents
```bash
db.users.countDocuments()
db.complaints.countDocuments()
```

### Find by Status
```bash
db.complaints.find({ status: "Pending" })
```

### Make User Admin
```bash
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 🚀 Deployment

### Backend (Heroku)

```bash
cd backend
heroku create smart-green-city-api
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set CLIENT_URL=https://your-frontend.com
git push heroku main
```

### Frontend (Vercel/Netlify)

Update `.env`:
```env
REACT_APP_API_URL=https://smart-green-city-api.herokuapp.com/api
```

Build and deploy:
```bash
npm run build
# Deploy build folder
```

---

## 📚 API Documentation

Full API documentation available in `backend/README.md`

**Quick Reference:**

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Register user |
| `/api/auth/login` | POST | No | Login user |
| `/api/auth/me` | GET | Yes | Get profile |
| `/api/complaints` | POST | Yes | Create complaint |
| `/api/complaints` | GET | No | Get all complaints |
| `/api/complaints/:id` | GET | No | Get single complaint |
| `/api/complaints/:id/status` | PUT | Admin | Update status |
| `/api/complaints/:id` | DELETE | Yes | Delete complaint |

---

## 🎓 Next Steps

1. **Test the complete flow** from registration to complaint resolution
2. **Create admin user** for testing admin features
3. **Test file uploads** with actual images
4. **Monitor backend logs** for errors
5. **Set up production** environment when ready
6. **Add more features** (notifications, email, etc.)

---

**Need help? Check backend/SETUP_GUIDE.md for detailed backend setup!**
