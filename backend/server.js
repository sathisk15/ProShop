// const express = require('express')
import express from 'express'
import products from './data/products.js'

const app = express()

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

app.listen(5000, console.log("Backend server running port 5000"))