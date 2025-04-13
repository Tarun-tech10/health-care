const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Serve static files
app.use(express.static(__dirname));

// Specific route for the dashboard
app.get('/patient-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'patient-dashboard.html'));
});

// Specific route for appointments
app.get('/appointments', (req, res) => {
    res.sendFile(path.join(__dirname, 'appointments.html'));
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail
        pass: 'your-app-password' // Replace with your Gmail App Password
    }
});

// Mock user database
const users = [
    { email: 'doctor@example.com', password: 'doctor123', type: 'doctor' },
    { email: 'patient@example.com', password: 'patient123', type: 'patient' }
];

// Login endpoint
app.post('/api/login', (req, res) => {
    console.log('Login attempt:', req.body);
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
        console.log('Missing required fields');
        return res.status(400).json({ 
            success: false, 
            message: 'Please provide email, password and user type' 
        });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        console.log('Invalid credentials');
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid email or password' 
        });
    }

    if (user.type !== userType) {
        console.log('Invalid user type');
        return res.status(401).json({ 
            success: false, 
            message: `Invalid user type. You are not registered as a ${userType}` 
        });
    }

    console.log('Login successful for:', email);
    res.json({ 
        success: true, 
        message: 'Login successful',
        user: { email: user.email, type: user.type }
    });
});

// Connect with agent endpoint
app.post('/api/connect-agent', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const mailOptions = {
        from: 'your-email@gmail.com', // Replace with your Gmail
        to: 'your-email@gmail.com', // Replace with your email where you want to receive notifications
        subject: 'New Agent Connection Request',
        html: `
            <h2>New Agent Connection Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 