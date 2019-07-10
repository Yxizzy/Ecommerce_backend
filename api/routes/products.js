const express = require('express');

const router = express.Router();

const mongoose = require('mongoose')
const Product = require('../models/products')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+file.originalname)
    }
})
const fileFilter=(req,file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype ==='image/png'){
        cb(null, true)
    }
}
const upload = multer({
    storage: storage, 
//     limits: {
//         fileSize: 1024 * 1024 * 5
// },
fileFilter: fileFilter
});

// create get and post requests for products
router.get('/', (req, res, next) => {
   Product.find()
   .select("name price _id productImage")
   .exec()
   .then(
       products => {
           const response = {
                count: products.length,
                product: products.map(item => {
                   return {
                       name: item.name,
                       price: item.price,
                       description: item.description,
                       productImage: item.productImage,
                       color: item.color,
                       category: item.category,
                       _id: item._id
                   }
                })
           }
           res.status(200).json(response)
       }
   ).catch(
       err => {
           res.status(500).json({
               error: err
           })
       }
   )
});

router.post('/', upload.single('productImage'), (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        productImage: req.file.path || req.file.name,
        category: req.body.category,
        color: req.body.color
    })
    product.save().then(result => {
        res.status(201).json({
            message: 'Post Requests to Products',
            newProduct: {
                name: result.name,
                price: result.price,
                description: result.description,
                productImage: result.productImage,
                category: result.category,
                color: result.color
            }
        });
    }).catch(err =>
        {res.status(500).json({
            error: err
        })})
    
  
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
    .select('name price description category color productImage _id')
    .exec()
    .then(
        product => {
            if (!product){
                return res.status(404).json({
                    message: "Product Not Found"
                })
            }
            res.status(200).json({
               product
            });
        }
    )
    .catch(err => res.status(500).json({error: err}))

})
module.exports = router