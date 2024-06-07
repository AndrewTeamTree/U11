const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRoute = require('./routes/userRoutes');
const courseRoute = require('./routes/courseRoutes');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(morgan('dev'));

// Define route middleware
app.use('/api', userRoute);
app.use('/api', courseRoute);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// Route not found middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
