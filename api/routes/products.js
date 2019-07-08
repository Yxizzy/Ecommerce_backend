const express = require('express');

const router = express.Router();

const mongoose = require('mongoose')
const Product = require('../models/products')

// create get and post requests for products
router.get('/', (req, res, next) => {
   Product.find().exec().then(
       products => {
           res.status(200).json({product: products})
       }
   ).catch(
       err => {
           res.status(500).json({
               error: err
           })
       }
   )
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    })
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Post Requests to Products',
            product: product
        });
    }).catch(err =>
        {res.status(500).json({
            error: err
        })})
    
  
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id).exec().then(
        doc => {
            res.status(200).json(doc);
        }
    )
    .catch(err => res.status(500).json({error: err}))

})
module.exports = router