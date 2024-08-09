const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = 3019;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Make sure to parse JSON for possible future use
app.use(express.static(path.join(__dirname, '/public/img/logo.png')));
// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/students');

const db = mongoose.connection;
db.once('open', () => {
    console.log("Mongodb Connected Successfully");
});

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', UserSchema);

// JWT Secret (Use a secure key in production)
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
  });


// app.get('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).send('Invalid email or password.');
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).send('Invalid email or password.');
//         }

//         // Generate a JWT token (optional)
//         const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

//         // Redirect to home page
//         res.redirect('/home');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error logging in.');
//     }
// });

app.post('/post', (req, res) => {
    // ...
    user.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating user' });
      }
      res.redirect('/login');
    });
  });
  
app.get('/home', (req, res) => {
    res.send('<h1>Welcome to Home</h1>');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
