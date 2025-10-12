# 🚀 Quick Start Guide - Smart Green City

## Step 1: Install Dependencies

Open PowerShell or Command Prompt in the project folder and run:

```bash
npm install
```

This will install:
- React and React DOM
- React Router DOM (for navigation)
- All other required dependencies

## Step 2: Start the Development Server

### Option A: Using Command Prompt (Recommended)
```bash
npm start
```

### Option B: Using PowerShell
If you get a security error, first run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run:
```powershell
npm start
```

## Step 3: Access the Application

The app will automatically open in your browser at:
```
http://localhost:3000
```

If it doesn't open automatically, manually navigate to that URL.

## 🎯 Quick Feature Tour

### 1. Report an Issue (📝)
- Click "Report Issue" in navigation
- Fill out the form
- Click "Get Current Location" to auto-fill location
- Upload an image (optional)
- Submit and save your Complaint ID

### 2. Track Your Complaint (📊)
- Click "Track" in navigation
- Enter your Complaint ID
- View status and progress timeline

### 3. Admin Dashboard (🎯)
- Click "Admin" in navigation
- View all complaints
- Filter by status
- Click any complaint to view details
- Update status or delete complaints

### 4. View Analytics (📈)
- Click "Analytics" in navigation
- See city health metrics
- View charts and environmental data

### 5. Green Tips (🌱)
- Click "Green Tips" in navigation
- Learn eco-friendly practices
- Join green challenges

### 6. Air Quality (💨)
- Click "Air Quality" in navigation
- Check real-time AQI
- View pollutant levels
- See 7-day forecast

## 💡 Tips

1. **Test the full workflow:**
   - Report an issue → Save the ID → Track it → Go to Admin → Update status → Track again

2. **Data persistence:**
   - All data is saved in browser localStorage
   - Clear browser data will reset everything

3. **Location feature:**
   - Allow location access when prompted
   - Or manually enter address/coordinates

4. **Multiple complaints:**
   - Report several issues to see analytics populate

## 🐛 Troubleshooting

### Issue: "npm is not recognized"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: PowerShell execution policy error
**Solution:** Use Command Prompt instead, or run as Administrator and change policy

### Issue: Port 3000 already in use
**Solution:** 
- Close other React apps
- Or use a different port: `PORT=3001 npm start`

### Issue: Blank page after starting
**Solution:**
- Check browser console for errors (F12)
- Ensure all dependencies installed correctly
- Try `npm install` again

### Issue: Styles not loading
**Solution:**
- Hard refresh browser (Ctrl + Shift + R)
- Clear browser cache

## 📱 Testing on Mobile

1. Find your computer's IP address:
   ```bash
   ipconfig
   ```

2. On your mobile device (same WiFi network):
   ```
   http://YOUR_IP_ADDRESS:3000
   ```

## 🎨 Customization

Want to customize? Edit these files:

- **Colors:** `src/App.css` (CSS variables at top)
- **Content:** Individual page files in `src/pages/`
- **Navigation:** `src/components/Navigation.jsx`
- **Styles:** Individual CSS files in `src/styles/`

## 📦 Building for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized `build/` folder ready for deployment.

---

**Need help? Check SMART_GREEN_CITY_README.md for detailed documentation!**
