const express = require('express')
const path = require('path')

// Looks for a port number specific to the environment. If not, defaults to 3001
const PORT = process.env.PORT || 3001;

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for Add Page
app.get('/add', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/add.html'))
);

app.listen(PORT, () => 
    console.log(`Server listening at ${PORT}`)
)