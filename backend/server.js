// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

// Error handler
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

// Check Routes folder 
import productRoutes from './routes/productRoutes.js'

// It is for Environment Variable setup as process.env.<Variable name declared in the .env file>
dotenv.config()
// Routing setup
const app = express()
// To Connect DB setup
connectDB()
app.get('/',(req, res)=>{
    res.send('Api is running')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Backend server running in ${process.env.Node_ENV} mode on port ${PORT}`))