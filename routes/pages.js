const express = require('express')
const pages = express.Router()

pages.get('/', (req, res, next) => {
    console.log('funcionó la ruta GET');
    res.send('funcionó el GET')
} )

pages.post('/', (req, res, next) => {
    console.log('funcionó el post');
    res.send('Este es un post')
})


module.exports = pages