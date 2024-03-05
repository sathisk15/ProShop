// const express = require('express')
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
// Error handler
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Check Routes folder
import productRoutes from './routes/productRoutes.js';

// User Routes
import userRoutes from './routes/userRoutes.js';

// Order Routes
import orderRoutes from './routes/orderRoutes.js';

// It is for Environment Variable setup as process.env.<Variable name declared in the .env file>
dotenv.config();
// Routing setup
const app = express();
// To Connect DB setup

app.use(express.json());

var whitelist = [
  'http://localhost:3000',
  'https://proshop-gqaz.onrender.com/',
  'https://proshopping-app.web.app/',
  'https://proshopping-app.firebaseapp.com/',
];

var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

connectDB();
app.get('/', (req, res) => {
  res.send('Api is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Backend server running in ${process.env.Node_ENV} mode on port ${PORT}`
  )
);
