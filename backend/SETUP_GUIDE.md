# 🎯 Backend Setup Guide - Step by Step

## Option 1: Local MongoDB (Recommended for Development)

### Step 1: Install MongoDB

**Windows:**
1. Download MongoDB from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Choose "Complete" installation
4. Install MongoDB as a Service (check the box)
5. Install MongoDB Compass (GUI tool)

**Verify Installation:**
```bash
mongod --version
```

### Step 2: Start MongoDB

MongoDB should start automatically as a service. If not:

```bash
# Windows
net start MongoDB

# Or run manually
mongod
```

### Step 3: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

### Step 4: Configure .env

Edit `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smart-green-city
JWT_SECRET=my_super_secret_key_12345
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
```

### Step 5: Start Backend Server

```bash
# Development mode (auto-restart on changes)
npm run dev

# Or production mode
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📍 Environment: development
🌐 API URL: http://localhost:5000/api
```

### Step 6: Test API

Open browser or Postman:
```
http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Smart Green City API is running",
  "timestamp": "2025-10-10T..."
}
```

---

## Option 2: MongoDB Atlas (Cloud - Free Tier)

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with email or Google

### Step 2: Create Cluster

1. Choose "FREE" tier (M0 Sandbox)
2. Select cloud provider (AWS recommended)
3. Choose region closest to you
4. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `smartcity`
5. Password: Generate or create strong password
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Whitelist IP Address

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP
4. Click "Confirm"

### Step 5: Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

Example:
```
mongodb+srv://smartcity:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/smart-green-city?retryWrites=true&w=majority
```

### Step 6: Configure Backend

Edit `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://smartcity:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/smart-green-city?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_key_12345
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Step 7: Start Server

```bash
npm run dev
```

---

## 🧪 Testing the Backend

### Test 1: Register a User

**Using Postman:**
1. Method: POST
2. URL: `http://localhost:5000/api/auth/register`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123",
  "phone": "1234567890"
}
```

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "citizen"
  }
}
```

**Save the token!** You'll need it for authenticated requests.

### Test 2: Login

```json
POST http://localhost:5000/api/auth/login

{
  "email": "test@example.com",
  "password": "test123"
}
```

### Test 3: Create Complaint

```json
POST http://localhost:5000/api/complaints
Authorization: Bearer YOUR_TOKEN_HERE

{
  "type": "Garbage & Waste",
  "title": "Overflowing bin",
  "description": "Garbage bin overflowing for 3 days",
  "location": "Main Street, Downtown",
  "latitude": "40.7128",
  "longitude": "-74.0060"
}
```

### Test 4: Get All Complaints

```
GET http://localhost:5000/api/complaints
```

### Test 5: Get Single Complaint

```
GET http://localhost:5000/api/complaints/CMP123ABC
```

---

## 🔧 Create Admin User

After registering a user, make them admin:

### Using MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select `smart-green-city` database
4. Click `users` collection
5. Find your user
6. Click edit (pencil icon)
7. Change `"role": "citizen"` to `"role": "admin"`
8. Click "Update"

### Using Mongo Shell

```bash
# Connect to MongoDB
mongo

# Switch to database
use smart-green-city

# Update user role
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { role: "admin" } }
)
```

### Using MongoDB Atlas

1. Go to Collections
2. Find your database
3. Browse `users` collection
4. Edit the user document
5. Change role to "admin"

---

## 🔗 Connect Frontend to Backend

### Step 1: Create API Service File

Create `src/services/api.js` in your React app:

```javascript
const API_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API helper function
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` })
    }
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const authAPI = {
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }),
  
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),
  
  getProfile: () => apiCall('/auth/me')
};

export const complaintAPI = {
  create: (formData) => apiCall('/complaints', {
    method: 'POST',
    body: formData // FormData for file upload
  }),
  
  getAll: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/complaints?${query}`);
  },
  
  getById: (id) => apiCall(`/complaints/${id}`),
  
  updateStatus: (id, status, comment) => apiCall(`/complaints/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, comment })
  }),
  
  delete: (id) => apiCall(`/complaints/${id}`, {
    method: 'DELETE'
  })
};
```

### Step 2: Update ReportIssue Component

Replace localStorage with API call:

```javascript
import { complaintAPI } from '../services/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('type', formData.type);
  formData.append('title', formData.title);
  formData.append('description', formData.description);
  formData.append('location', formData.location);
  if (formData.image) {
    formData.append('image', formData.image);
  }
  
  try {
    const response = await complaintAPI.create(formData);
    setComplaintId(response.complaint.complaintId);
    setSubmitted(true);
  } catch (error) {
    alert(error.message);
  }
};
```

---

## 📊 View Database

### MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect: `mongodb://localhost:27017`
3. Browse databases and collections
4. View, edit, delete documents

### Mongo Shell (CLI)

```bash
# Connect
mongo

# Show databases
show dbs

# Use database
use smart-green-city

# Show collections
show collections

# View users
db.users.find().pretty()

# View complaints
db.complaints.find().pretty()

# Count documents
db.complaints.countDocuments()

# Find by status
db.complaints.find({ status: "Pending" })
```

---

## 🐛 Common Issues

### Issue 1: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError`

**Solutions:**
- Check if MongoDB is running: `net start MongoDB`
- Verify connection string in `.env`
- For Atlas: Check IP whitelist and credentials

### Issue 2: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

### Issue 3: JWT Token Invalid

**Error:** `Not authorized to access this route`

**Solutions:**
- Check token format: `Bearer TOKEN`
- Verify JWT_SECRET matches
- Token might be expired (login again)

### Issue 4: File Upload Fails

**Error:** `Only image files are allowed`

**Solutions:**
- Check file type (JPEG, PNG, GIF only)
- Verify file size (max 5MB)
- Ensure `uploads` folder exists

### Issue 5: CORS Error

**Error:** `Access-Control-Allow-Origin`

**Solutions:**
- Check `CLIENT_URL` in `.env`
- Verify CORS configuration in `server.js`
- Frontend must run on specified CLIENT_URL

---

## ✅ Verification Checklist

- [ ] MongoDB installed and running
- [ ] Backend dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Server starts without errors
- [ ] Health check endpoint works
- [ ] Can register a user
- [ ] Can login and get token
- [ ] Can create complaint with token
- [ ] Can view complaints
- [ ] Admin user created
- [ ] Can update complaint status (admin)

---

## 🎓 Next Steps

1. **Test all endpoints** using Postman or cURL
2. **Create admin user** for testing admin features
3. **Connect frontend** to backend API
4. **Test file uploads** with actual images
5. **Monitor logs** for errors
6. **Set up production** environment when ready

---

## 📚 Useful Commands

```bash
# Backend
npm run dev          # Start development server
npm start            # Start production server
npm install          # Install dependencies

# MongoDB
mongod               # Start MongoDB
mongo                # Open Mongo shell
show dbs             # List databases
use smart-green-city # Switch database

# Git
git status           # Check changes
git add .            # Stage changes
git commit -m "msg"  # Commit changes
```

---

**Need help? Check the main README.md or create an issue!**
