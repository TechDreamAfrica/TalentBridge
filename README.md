# TalentBridge Ghana - Recruitment Website

A modern, responsive recruitment website for a Ghanaian recruitment company, built with HTML, CSS, and Firebase integration.

## Features

### 🎨 Modern Design
- Clean, professional interface with modern color palette
- Responsive design that works on all devices
- Smooth animations and hover effects
- Ghana-inspired branding colors

### 🔧 Functionality
- **Job Listings**: Display available positions with detailed information
- **Application System**: Complete application form with resume upload
- **Contact Forms**: Easy communication with the recruitment team
- **Mobile-First Design**: Optimized for mobile and desktop users
- **Firebase Integration**: Real-time data storage and file uploads

### 🌈 Color Scheme
- **Primary Blue**: #2E86AB (Trust and professionalism)
- **Secondary Purple**: #A23B72 (Creativity and innovation)
- **Accent Orange**: #F18F01 (Energy and enthusiasm)
- **Success Green**: #6A994E (Growth and prosperity)
- **Dark**: #1E2019 (Elegance and sophistication)

## Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript ES6+**: Interactive functionality and form handling
- **Firebase**: Backend services for data storage and file uploads
- **Font Awesome**: Professional icons
- **Google Fonts**: Inter font family for modern typography

## File Structure

```
project 1/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and Firebase integration
└── README.md           # Project documentation
```

## Setup Instructions

### 1. Firebase Configuration
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database and Storage
3. Copy your Firebase configuration
4. Replace the placeholder config in `script.js`:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### 2. Database Structure
The application creates two main collections in Firestore:

**Applications Collection**:
```
applications/
├── firstName: string
├── lastName: string
├── email: string
├── phone: string
├── position: string
├── experience: string
├── coverLetter: string
├── resumeURL: string
├── timestamp: timestamp
```

**Contacts Collection**:
```
contacts/
├── name: string
├── email: string
├── subject: string
├── message: string
├── timestamp: timestamp
```

### 3. Storage Rules
Configure Firebase Storage rules for resume uploads:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resumes/{allPaths=**} {
      allow read, write: if request.auth != null || true;
    }
  }
}
```

### 4. Firestore Rules
Configure Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{document} {
      allow read, write: if true;
    }
    match /contacts/{document} {
      allow read, write: if true;
    }
  }
}
```

## Features in Detail

### Job Listings
- Dynamic job cards with company information
- Salary ranges and location details
- Skill tags for easy filtering
- Apply directly from job listings

### Application System
- Multi-step form with validation
- File upload for resumes (PDF only, max 5MB)
- Real-time form validation
- Success/error messaging

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile navigation
- Flexible grid layouts
- Touch-friendly interface

### Performance Optimizations
- Lazy loading for images
- Minified CSS and JavaScript
- Optimized animations
- Efficient Firebase queries

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## SEO Features

- Semantic HTML5 markup
- Meta tags for social sharing
- Structured data for job listings
- Accessible navigation and forms

## Future Enhancements

- User authentication for job seekers and employers
- Advanced job search and filtering
- Employer dashboard for job management
- Real-time notifications
- Integration with job boards
- Multi-language support (English/Twi/Ewe)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes and can be used as a template for recruitment websites.

## Contact

For questions or support regarding this recruitment website template, please contact the development team.

---

**TalentBridge Ghana** - Connecting talent with opportunity across Ghana since 2018.
