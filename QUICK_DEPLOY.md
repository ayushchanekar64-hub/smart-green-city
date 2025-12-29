# ⚡ Quick Deploy Guide - Hindi

## तुरंत Deploy करने के लिए ये Steps Follow करें:

### 1️⃣ MongoDB Atlas Setup (5 minutes)

1. https://www.mongodb.com/cloud/atlas पर जाएं
2. Free account बनाएं
3. "Create a New Cluster" → Free tier (M0) select करें
4. Database Access → Add User (username/password बनाएं)
5. Network Access → Add IP → **"Allow Access from Anywhere"** (0.0.0.0/0)
6. Connect → Connect your application → Connection string copy करें

### 2️⃣ Backend Deploy (Render) - 10 minutes

1. **GitHub Repository बनाएं:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Backend ready"
   git remote add origin https://github.com/YOUR_USERNAME/backend-repo.git
   git push -u origin main
   ```

2. **Render पर Deploy:**
   - https://render.com पर जाएं
   - New → Web Service
   - GitHub repo connect करें
   - Settings:
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Instance Type: Free

3. **Environment Variables Add करें:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<any-random-strong-string>
   CLIENT_URL=https://your-app.vercel.app
   ```

4. Deploy होने का wait करें (2-3 min)
5. URL copy करें: `https://your-backend.onrender.com`

### 3️⃣ Frontend Deploy (Vercel) - 5 minutes

1. **Root folder में:**
   ```bash
   # .env.production file already created hai
   # Bas backend URL update करें
   ```

2. **Vercel CLI से Deploy:**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

3. **Environment Variable Add करें:**
   ```bash
   vercel env add REACT_APP_API_URL
   # Value: https://your-backend.onrender.com/api
   # Environment: Production
   ```

4. **Production Deploy:**
   ```bash
   vercel --prod
   ```

### 4️⃣ Final Step - Backend में Frontend URL Update

1. Render dashboard → Your service → Environment
2. `CLIENT_URL` को update करें: `https://your-app.vercel.app`
3. Save → Service auto-redeploy होगी

---

## ✅ Testing

1. Frontend URL खोलें
2. Register करें
3. Login करें
4. Complaint submit करें

**Done! 🎉**

---

## 🔴 Common Errors & Solutions

### "Server not responding"
- Check: Backend Render पर running है?
- Test: `https://your-backend.onrender.com/api/health`

### "CORS Error"
- Backend में `CLIENT_URL` सही है?
- Render पर environment variable update करें

### "MongoDB connection failed"
- IP whitelist में 0.0.0.0/0 है?
- Connection string सही है?

---

## 📞 URLs to Remember

- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-backend.onrender.com
- **MongoDB:** https://cloud.mongodb.com

---

**Total Time: ~20 minutes**
