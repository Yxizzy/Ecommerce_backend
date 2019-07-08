// spin off express
const express = require('express');
const app = express();

const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// set middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// set up moongoose
var mongoDB = 'mongodb+srv://sylvia:Uppertexy667@cluster0-gsdzz.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true})
console.log(mongoDB)

// set headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "POST, GET");
        return res.status(200).json({})
    }
    next()
})

// Routing and catching errors
const ProductRoutes = require('./api/routes/products')

app.use('/products', ProductRoutes)

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status= 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})
module.exports = app;