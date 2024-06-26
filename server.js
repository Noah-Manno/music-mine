const express = require('express');
const path = require('path');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for Login Page
app.get('/login', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/login.html'))
);

// GET route for SignUp Page
app.get('/signup', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/signup.html'))
);

// GET route for Add Page
app.get('/library', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/library.html'))
);

// GET route for Concerts Page
app.get('/concerts', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/concerts.html'))
);
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
});
