const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

const dataPath = path.join(__dirname, 'data.json');

app.get('/api/portfolio', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/portfolio', async (req, res) => {
    try {
        const { name, age, email, message } = req.body;

        const newContact = new Contact({
            name,
            age,
            email,
            message
        });

        await newContact.save();
        console.log('New Contact Submission saved to MongoDB:', { name, age, email, message });

        res.status(201).json({
            message: 'Submission successful!',
            receivedData: { name, email }
        });
    } catch (error) {
        console.error('Error saving to database:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});