const express = require('express');
const db = require('./db/connection.js');



// looks for index.js if it exists in the directory
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// router function
app.use('/api', apiRoutes);

// default 404 not found response
app.use((req, res) => {
    res.status(404).end();
});

// this starts the server after connecting to the database
db.connect(err => {
    if (err) throw err;
    console.log('connected to the database');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
});