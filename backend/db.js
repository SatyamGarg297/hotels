const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
const MONGO_URI = process.env.MONGODB_URI// Replace 'mydatabase' with your database name

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

