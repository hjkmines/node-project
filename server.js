const express = require('express')
const dotenv = require('dotenv')

//routes files 
const bootcamps = require('./routes/bootcamps')

//Load env vars 
dotenv.config({path: './config/config.env'});

const app = express(); 

//Mount router 
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))


