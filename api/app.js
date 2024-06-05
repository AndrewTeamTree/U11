//api/app.js

'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const courseRoute = require('./routes/courseRoutes');
const app = express();
const sequelize = require('./models/index').sequelize;


// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));


// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

app.use(express.json());
app.use(morgan('dev'));

// Define route middleware
app.use('/api', userRoute);
app.use('/api', courseRoute);

// Route not found middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});


// Start the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Express server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
