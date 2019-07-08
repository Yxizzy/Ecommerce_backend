const express = require('express');

const router = express.Router();

// create get and post requests for products
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get Requests to Products'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        message: 'Post Requests to Products',
        product: product
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if (id === 'x'){
        res.status(200).json({
            message: 'X products',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'you passed an id'
        });
    }
})
module.exports = router