const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// API Routes
app.use('/api', routes);

// Start server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
