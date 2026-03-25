const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Path to your data file
const dataPath = path.join(__dirname, 'data.json');

// 1. GET Route: To send portfolio data to the frontend
app.get('/api/portfolio', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(JSON.parse(data));
    });
});

// 2. POST Route: To receive and save contact form submissions
app.post('/api/portfolio', (req, res) => {
    const { name, age, email, message } = req.body;

    // Log the data to the console (you'll see this in your Render logs)
    console.log('New Contact Submission:', { name, age, email, message });

    // Optional: You can append this data to a file or database here.
    // For now, we return a success response.
    res.status(201).json({
        message: 'Submission successful!',
        receivedData: { name, email }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});