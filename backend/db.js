const mongoose = require('mongoose');

// Define the MongoDB connection URL
const MONGO_URI = 'mongodb+srv://satyamgarg1672001:mxansIYB8DPqorPv@restorant23.bf06ld7.mongodb.net/' // Replace 'mydatabase' with your database name

// set up MongoDB connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection 
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log('connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;

