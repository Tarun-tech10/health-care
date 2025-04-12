const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user database
const users = {
    patients: [
        { id: 1, email: 'patient@example.com', password: 'patient123', name: 'John Doe' },
        { id: 2, email: 'patient2@example.com', password: 'patient123', name: 'Jane Smith' }
    ],
    doctors: [
        { id: 1, email: 'doctor@example.com', password: 'doctor123', name: 'Dr. Sarah Johnson' },
        { id: 2, email: 'doctor2@example.com', password: 'doctor123', name: 'Dr. Michael Brown' }
    ]
};

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const userList = users[userType + 's'];
    const user = userList.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({
            success: true,
            id: user.id,
            name: user.name,
            message: 'Login successful'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 