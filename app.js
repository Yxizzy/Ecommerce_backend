const express = require('express');
// spin off express
const app = express();

app.use((req, res, next)  => {
    res.status(200).json({
        message: "Successful"
    })
});

module.exports = app;