# 🌍 Smart Green City - Citizen Complaint Portal

A comprehensive web application for citizens to report and track city issues like garbage, flooding, pollution, and road damage. Built with React and modern web technologies.

## ✨ Features

### 🏠 Home Page
- Hero section with city statistics
- Feature cards for quick navigation
- Common issue types display

### 📝 Report Issue
- Multi-step complaint registration form
- Image upload capability
- Geolocation integration (Get Current Location button)
- Issue type categorization:
  - Garbage & Waste
  - Flooding
  - Pollution
  - Road Damage
  - Street Lights
  - Green Spaces
  - Other

### 📊 Track Complaints
- Search complaints by ID
- Real-time status tracking
- Progress timeline visualization
- Recent complaints list
- Status badges (Pending, In Progress, Resolved, Rejected)

### 🎯 Admin Dashboard
- Complaint management interface
- Filter by status (All, Pending, In Progress, Resolved)
- Update complaint status
- Delete complaints
- Statistics overview (Total, Pending, In Progress, Resolved)

### 📈 City Analytics
- Key metrics dashboard
- Issues by type (bar charts)
- Status distribution (pie charts)
- Environmental metrics:
  - Air Quality Index
  - Waste collected
  - Recycling rate
  - Green cover
  - Water quality
  - Noise pollution
- Key insights and trends

### 🌱 Green Tips
- Eco-friendly best practices
- Categories:
  - Waste Management
  - Water Conservation
  - Energy Saving
  - Green Transportation
  - Air Quality
  - Community Action
- Green challenges to join
- Educational resources
- Impact statistics

### 💨 Air Quality Monitor
- Real-time AQI display
- Color-coded air quality levels
- Location-wise AQI breakdown
- Pollutant levels (PM2.5, PM10, O3, NO2, SO2, CO)
- Health recommendations
- 7-day forecast

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
firstweb/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ReportIssue.jsx
│   │   ├── TrackComplaint.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Analytics.jsx
│   │   ├── GreenTips.jsx
│   │   └── AirQuality.jsx
│   ├── styles/
│   │   ├── home.css
│   │   ├── forms.css
│   │   ├── tracking.css
│   │   ├── admin.css
│   │   ├── analytics.css
│   │   ├── tips.css
│   │   └── airquality.css
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
```

## 🎨 Design Features

- **Modern UI:** Clean, intuitive interface with smooth animations
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile
- **Color Scheme:** Green-themed palette representing sustainability
- **Typography:** Inter font family for clean readability
- **Icons:** Emoji-based icons for universal understanding

## 💾 Data Storage

Currently uses **localStorage** for data persistence. In a production environment, this should be replaced with:
- Backend API (Node.js/Express, Django, etc.)
- Database (MongoDB, PostgreSQL, etc.)
- Cloud storage for images
- Authentication system

## 🔧 Technologies Used

- **React** (v19.2.0) - UI library
- **React Router DOM** (v6.22.0) - Client-side routing
- **CSS3** - Styling with CSS variables
- **LocalStorage API** - Data persistence
- **Geolocation API** - Location tracking
- **File API** - Image uploads

## 📱 Features in Detail

### Complaint Registration
1. Select issue type from dropdown
2. Enter title and detailed description
3. Add location (manual or GPS)
4. Upload photo evidence (optional)
5. Receive unique complaint ID

### Tracking System
- 4-stage progress tracking:
  1. Submitted
  2. Under Review
  3. In Progress
  4. Resolved

### Admin Capabilities
- View all complaints in table format
- Filter by status
- Update status with single click
- View detailed complaint information
- Delete resolved/invalid complaints

### Analytics Dashboard
- Visual charts and graphs
- Real-time statistics
- Environmental health metrics
- Trend analysis
- Key insights

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Future Enhancements

- [ ] User authentication and profiles
- [ ] Email/SMS notifications
- [ ] Real-time updates with WebSockets
- [ ] Map integration for location visualization
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Export reports (PDF/Excel)
- [ ] Mobile app (React Native)
- [ ] AI-powered issue categorization
- [ ] Community voting on issues

## 🤝 Contributing

This is an educational project. Feel free to fork and enhance!

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Developer Notes

- All complaint data is stored in browser localStorage
- Complaint IDs are generated using random strings
- AQI and environmental data are currently mock values
- Geolocation requires HTTPS in production
- Image uploads are stored as file names only (not actual files)

## 🎯 Use Cases

1. **Citizens:** Report issues and track resolution
2. **City Officials:** Manage and prioritize complaints
3. **Analysts:** Monitor city health metrics
4. **Community:** Learn eco-friendly practices

---

**Built with ❤️ for a cleaner, greener city**
