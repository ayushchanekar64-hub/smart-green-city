# 🚀 Smart Green City - Backend API

Complete REST API with authentication, file uploads, and MongoDB integration.

## 📋 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Citizen, Admin)
- Secure password hashing with bcrypt
- Token expiration and refresh

### 📝 Complaint Management
- Create, read, update, delete complaints
- Image upload support
- Status tracking (Pending → In Progress → Resolved)
- Geolocation support
- Priority levels
- Status history tracking

### 👥 User Management
- User registration and login
- Profile management
- Admin user management
- Account activation/deactivation

### 📊 Analytics
- Complaint statistics
- Status distribution
- Type-based analytics
- Recent complaints tracking

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Rate Limiting** - API protection

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js           # User model
│   └── Complaint.js      # Complaint model
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── complaints.js     # Complaint routes
│   └── users.js          # User management routes
├── middleware/
│   ├── auth.js           # Auth middleware
│   └── upload.js         # File upload middleware
├── uploads/              # Uploaded files directory
├── .env.example          # Environment variables template
├── server.js             # Entry point
└── package.json          # Dependencies

```

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local or Atlas)
3. **npm** or **yarn**

### Installation

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   Edit `.env` file with your settings:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smart-green-city
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

5. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Run the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Private |
| PUT | `/updateprofile` | Update profile | Private |
| PUT | `/changepassword` | Change password | Private |

### Complaints (`/api/complaints`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create complaint | Private |
| GET | `/` | Get all complaints | Public |
| GET | `/:id` | Get single complaint | Public |
| PUT | `/:id` | Update complaint | Private |
| PUT | `/:id/status` | Update status | Admin |
| DELETE | `/:id` | Delete complaint | Private/Admin |
| GET | `/stats/overview` | Get statistics | Admin |

### Users (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all users | Admin |
| GET | `/:id` | Get single user | Admin |
| PUT | `/:id/role` | Update user role | Admin |
| PUT | `/:id/status` | Activate/deactivate | Admin |
| DELETE | `/:id` | Delete user | Admin |

## 📝 API Usage Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Complaint

```bash
POST /api/complaints
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data

{
  "type": "Garbage & Waste",
  "title": "Overflowing garbage bin",
  "description": "The bin has been full for 3 days",
  "location": "Main Street, Downtown",
  "latitude": "40.7128",
  "longitude": "-74.0060",
  "image": [file]
}
```

### Get Complaints

```bash
GET /api/complaints?status=Pending&page=1&limit=10
```

### Update Complaint Status (Admin)

```bash
PUT /api/complaints/:id/status
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json

{
  "status": "In Progress",
  "comment": "Team assigned to resolve this issue"
}
```

## 🔒 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Getting a Token

1. Register or login to get a token
2. Store the token securely (localStorage/sessionStorage)
3. Include it in all authenticated requests

### Token Expiration

Tokens expire after 7 days (configurable in `.env`). Users need to login again after expiration.

## 👤 User Roles

### Citizen (Default)
- Create complaints
- View own complaints
- Update own complaints
- Track complaint status

### Admin
- All citizen permissions
- View all complaints
- Update any complaint status
- Delete complaints
- Manage users
- View analytics

## 📤 File Uploads

### Image Upload Configuration

- **Allowed formats:** JPEG, JPG, PNG, GIF, WEBP
- **Max file size:** 5MB (configurable)
- **Storage:** Local filesystem (`uploads/complaints/`)
- **Naming:** `complaint-{timestamp}-{random}.{ext}`

### Upload Example

```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('type', 'Garbage & Waste');
formData.append('title', 'Issue title');
// ... other fields

fetch('http://localhost:5000/api/complaints', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

## 🗄️ Database Schema

### User Schema

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (citizen/admin),
  phone: String,
  address: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaint Schema

```javascript
{
  complaintId: String (unique, auto-generated),
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
  image: String (URL),
  status: String (enum),
  priority: String (enum),
  assignedTo: ObjectId (ref: User),
  statusHistory: Array,
  resolvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | Required |
| JWT_SECRET | JWT signing secret | Required |
| JWT_EXPIRE | Token expiration | 7d |
| CLIENT_URL | Frontend URL (CORS) | http://localhost:3000 |
| MAX_FILE_SIZE | Max upload size (bytes) | 5242880 (5MB) |

## 🛡️ Security Features

- **Helmet** - Security headers
- **Rate Limiting** - Prevent abuse (100 requests/15min)
- **CORS** - Controlled cross-origin access
- **Password Hashing** - Bcrypt with salt rounds
- **JWT** - Secure token-based auth
- **Input Validation** - Express-validator
- **File Type Validation** - Only images allowed
- **File Size Limits** - Prevent large uploads

## 📊 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 🧪 Testing

### Using Postman

1. Import the API collection (create one from endpoints above)
2. Set environment variables (base URL, token)
3. Test each endpoint

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get complaints
curl http://localhost:5000/api/complaints
```

## 🚀 Deployment

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create smart-green-city-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### MongoDB Atlas Setup

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Add to `.env` as `MONGODB_URI`

## 📝 Development Tips

### Create Admin User

After registration, manually update user role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Reset Database

```bash
# Drop database
mongo smart-green-city --eval "db.dropDatabase()"
```

### View Logs

```bash
# Development
npm run dev

# Production with PM2
pm2 logs
```

## 🐛 Troubleshooting

### MongoDB Connection Error

- Check if MongoDB is running
- Verify connection string in `.env`
- Check network/firewall settings

### JWT Token Invalid

- Token might be expired
- Check JWT_SECRET matches
- Ensure token format: `Bearer TOKEN`

### File Upload Fails

- Check file size (max 5MB)
- Verify file type (images only)
- Ensure `uploads` directory exists

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

---

**Built with ❤️ for Smart Green City**
