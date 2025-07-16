// Firebase Configuration
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Sample job data
const sampleJobs = [
    {
        title: "Senior Software Developer",
        company: "TechStart Ghana",
        location: "Accra, Ghana",
        salary: "GHS 8,000 - 12,000",
        description: "We're looking for an experienced software developer to join our dynamic team and help build cutting-edge applications.",
        tags: ["JavaScript", "React", "Node.js", "MongoDB"],
        date: "2 days ago",
        type: "Full-time"
    },
    {
        title: "Marketing Manager",
        company: "GrowthCorp",
        location: "Kumasi, Ghana",
        salary: "GHS 6,000 - 9,000",
        description: "Lead our marketing initiatives and drive brand growth across Ghana's major cities.",
        tags: ["Digital Marketing", "Strategy", "Analytics", "Leadership"],
        date: "1 week ago",
        type: "Full-time"
    },
    {
        title: "Financial Analyst",
        company: "GoldCoast Finance",
        location: "Accra, Ghana",
        salary: "GHS 5,500 - 7,500",
        description: "Analyze financial data and provide insights to support business decision-making.",
        tags: ["Excel", "Financial Modeling", "Analysis", "Reporting"],
        date: "3 days ago",
        type: "Full-time"
    },
    {
        title: "Sales Executive",
        company: "SalesForce Ghana",
        location: "Tamale, Ghana",
        salary: "GHS 4,000 - 6,000",
        description: "Drive sales growth and build strong relationships with clients across Northern Ghana.",
        tags: ["Sales", "CRM", "Communication", "Target-driven"],
        date: "5 days ago",
        type: "Full-time"
    },
    {
        title: "HR Specialist",
        company: "People First",
        location: "Accra, Ghana",
        salary: "GHS 5,000 - 7,000",
        description: "Manage recruitment, employee relations, and HR policies to support our growing team.",
        tags: ["Recruitment", "Employee Relations", "HR Policies", "Communication"],
        date: "1 week ago",
        type: "Full-time"
    },
    {
        title: "Graphic Designer",
        company: "Creative Hub Ghana",
        location: "Cape Coast, Ghana",
        salary: "GHS 3,500 - 5,500",
        description: "Create compelling visual designs for digital and print media across various client projects.",
        tags: ["Adobe Creative Suite", "Branding", "Print Design", "UI/UX"],
        date: "4 days ago",
        type: "Contract"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const applicationForm = document.getElementById('applicationForm');
const contactForm = document.getElementById('contactForm');
const jobsContainer = document.getElementById('jobsContainer');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#FFFFFF';
        navbar.style.backdropFilter = 'none';
    }
});

// Load and display jobs
function displayJobs(jobs) {
    jobsContainer.innerHTML = '';
    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobsContainer.appendChild(jobCard);
    });
}

function createJobCard(job) {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    
    jobCard.innerHTML = `
        <div class="job-header">
            <h3 class="job-title">${job.title}</h3>
            <span class="job-salary">${job.salary}</span>
        </div>
        <div class="job-company">${job.company}</div>
        <div class="job-location">
            <i class="fas fa-map-marker-alt"></i>
            ${job.location}
        </div>
        <p class="job-description">${job.description}</p>
        <div class="job-tags">
            ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
        </div>
        <div class="job-footer">
            <span class="job-date">${job.date}</span>
            <a href="#apply" class="btn btn-primary" onclick="applyForJob('${job.title}', '${job.company}')">Apply Now</a>
        </div>
    `;
    
    return jobCard;
}

// Function to handle job application
function applyForJob(jobTitle, company) {
    const positionSelect = document.getElementById('position');
    positionSelect.value = 'other';
    
    // Scroll to application form
    document.getElementById('apply').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Add a custom message
    setTimeout(() => {
        showSuccessMessage(`Applying for ${jobTitle} at ${company}. Please fill out the form below.`);
    }, 1000);
}

// Load more jobs function
function loadMoreJobs() {
    // In a real application, this would fetch more jobs from the database
    showSuccessMessage('All available jobs are currently displayed. Check back later for new opportunities!');
}

// Application form submission
applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(applicationForm);
    const applicationData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        position: formData.get('position'),
        experience: formData.get('experience'),
        coverLetter: formData.get('coverLetter'),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    const resumeFile = formData.get('resume');
    
    try {
        applicationForm.classList.add('loading');
        
        // Upload resume to Firebase Storage
        let resumeURL = '';
        if (resumeFile && resumeFile.size > 0) {
            const resumeRef = storage.ref(`resumes/${Date.now()}_${resumeFile.name}`);
            const resumeSnapshot = await resumeRef.put(resumeFile);
            resumeURL = await resumeSnapshot.ref.getDownloadURL();
            applicationData.resumeURL = resumeURL;
        }
        
        // Save application to Firestore
        await db.collection('applications').add(applicationData);
        
        showSuccessMessage('Application submitted successfully! We will review your application and get back to you soon.');
        applicationForm.reset();
        
    } catch (error) {
        console.error('Error submitting application:', error);
        showErrorMessage('There was an error submitting your application. Please try again.');
    } finally {
        applicationForm.classList.remove('loading');
    }
});

// Contact form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        contactForm.classList.add('loading');
        
        // Save contact message to Firestore
        await db.collection('contacts').add(contactData);
        
        showSuccessMessage('Message sent successfully! We will get back to you within 24 hours.');
        contactForm.reset();
        
    } catch (error) {
        console.error('Error sending message:', error);
        showErrorMessage('There was an error sending your message. Please try again.');
    } finally {
        contactForm.classList.remove('loading');
    }
});

// Utility functions
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;
    
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#A23B72';
            isValid = false;
        } else {
            field.style.borderColor = '#F8F9FA';
        }
    });
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// File upload validation
function validateFileUpload(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf'];
    
    if (file.size > maxSize) {
        showErrorMessage('File size must be less than 5MB');
        return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
        showErrorMessage('Only PDF files are allowed');
        return false;
    }
    
    return true;
}

// Resume file validation
document.getElementById('resume').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && !validateFileUpload(file)) {
        e.target.value = '';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .job-card, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Load initial jobs
    displayJobs(sampleJobs);
});

// Statistics counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target >= 100 ? '+' : '%');
    }, 20);
}

// Initialize counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat h3');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace(/\D/g, ''));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statsObserver.observe(statsSection);
}

// Service worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Search functionality (for future enhancement)
function searchJobs(query) {
    const filteredJobs = sampleJobs.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    displayJobs(filteredJobs);
}
