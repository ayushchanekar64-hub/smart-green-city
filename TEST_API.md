# API Testing Guide

## Backend Status
- Backend should be running on: http://localhost:5000
- Frontend should be running on: http://localhost:3000

## Test Backend Directly

### 1. Check if backend is running:
```bash
curl http://localhost:5000/api/health
```

### 2. Test Registration (PowerShell):
```powershell
$body = @{
    name = 'Test User'
    email = 'test123@example.com'
    password = 'test123'
    phone = '1234567890'
    address = 'Test Address'
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/register' -Method Post -Body $body -ContentType 'application/json'
```

### 3. Get All Users:
```powershell
Invoke-RestMethod -Uri 'http://localhost:5000/api/users' -Method Get
```

## Common Issues & Solutions

### Issue: "Failed to fetch" on Registration
**Causes:**
1. Backend server not running
2. MongoDB not running
3. CORS issue
4. React dev server not restarted after proxy config

**Solutions:**
1. Start backend: `cd backend && npm start`
2. Start MongoDB: Check if mongod process is running
3. Restart React: Stop and start `npm start` in root directory
4. Clear browser cache and reload

### Issue: "Failed to fetch" on Show Users
**Causes:**
1. API URL mismatch
2. Proxy not configured properly

**Solutions:**
1. Make sure proxy is set in package.json: `"proxy": "http://localhost:5000"`
2. Restart React dev server after adding proxy
3. Use relative URLs like `/api/users` instead of full URLs

## Current Configuration

### package.json (Root)
```json
{
  "proxy": "http://localhost:5000"
}
```

### API Service (src/services/api.js)
```javascript
const API_URL = '/api'; // Uses proxy
```

### Backend CORS (backend/server.js)
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## Verify Everything is Working

1. **Backend Health Check:**
   - Open: http://localhost:5000/api/health
   - Should see: `{"status":"OK",...}`

2. **Frontend:**
   - Open: http://localhost:3000
   - Should load without errors

3. **Registration:**
   - Go to: http://localhost:3000/register
   - Fill form and submit
   - Should redirect to home page

4. **Show Users:**
   - Go to: http://localhost:3000/show-users
   - Should see table with registered users

## Debug Steps

If still getting "failed to fetch":

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to register/fetch users
4. Check the failed request:
   - What URL is it calling?
   - What's the error message?
   - Is it CORS error?
   - Is it 404 or 500 error?

5. Check browser Console tab for JavaScript errors

6. Check backend terminal for error logs
