const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Use session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 60 * 1000 }, // 5 hours
  })
);

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));

// Simple in-memory database for user credentials
const users = {
  username: 'sadhna',
  password: 'mall',
};

// Middleware to check if the user is logged in
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

// Login route
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the credentials are correct
  if (username === users.username && password === users.password) {
    // Create a session and store user information
    req.session.user = {
      username: users.username,
    };

    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// Dashboard route
app.get('/dashboard', requireLogin, (req, res) => {
  res.send(`
    <h1>Welcome, ${req.session.user.username}!</h1>
    <img src="1.jpg" alt="A photo" />
    <p>Happy Birthday!</p>
  
    <a href="/logout">Logout</a>
  `);
});

// Logout route
app.get('/logout', requireLogin, (req, res) => {
  // Destroy the session
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
