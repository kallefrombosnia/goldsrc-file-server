const express = require('express');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// Load config in global object
global.config = require('./config');


const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: {}, all_downloads: 0}).write()

// Init app
const app = express();

// Serve static files 
app.use(express.static('static'))


/*
    USER ROUTES
*/

// Download route
app.use(require('./src/routes/download'));

// API 
app.use('/api', require('./src/routes/api'));


// File not found 
app.use((req, res, next) => {
    res.status(404).send();
});


// Start app and listen on web port
app.listen(global.config.port, () =>{
    console.log(`Web server started on port http://localhost:3000 ...`);
});