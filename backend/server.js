// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import connectDB from './config/db.js'

// It is for Environment Variable setup as process.env.<Variable name declared in the .env file>
dotenv.config()
// Routing setup
const app = express()
// To Connect DB setup
connectDB()
app.get('/',(req, res)=>{
    res.send('Api is running')
})

app.get('/api/products', (req,res)=>{
    res.send(products)
})

app.get('/api/products/:id', (req,res)=>{
    const product = products.find(p=>p._id == req.params.id)
    res.send(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Backend server running in ${process.env.Node_ENV} mode on port ${PORT}`))