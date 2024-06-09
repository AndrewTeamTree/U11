const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

const userRoute = require('./routes/userRoutes');
const courseRoute = require('./routes/courseRoutes');
const app = express();

// Session configuration
app.use(session({
  name: 'sessionId',
  secret: 'yourSecretKey', // Replace with your own secret
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    sameSite: 'lax', // Can be 'strict', 'lax', or 'none'
  }
}));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Enable if you need to handle cookies
}));
app.use(express.json());
app.use(morgan('dev'));

// Define route middleware
app.use('/api', userRoute);
app.use('/api', courseRoute);
app.options('*', cors());

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
  console.error(`Global error handler: ${err.message}`);

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
