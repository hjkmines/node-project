const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const fileupload = require('express-fileupload')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

//Load env vars 
dotenv.config({path: './config/config.env'});

//Connect to database 
connectDB(); 

//routes files 
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')

const app = express(); 

//Body parser 
app.use(express.json())

//Dev Logging middleware (instead of using the middleware - logger)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// File uploading 
app.use(fileupload())

//Set static folder 
app.use(express.static(path.join(__dirname, 'public')))

//Mount router 
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))

//Handle unhandled promise rejections 
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`); 
    //close server and exit process 
    server.close(() => {
        process.exit(1)
    })
});

