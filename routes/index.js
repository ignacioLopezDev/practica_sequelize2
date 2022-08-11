const express = require ('express')
const router = express.Router()

const pages = require ('./pages')
const users = require ('./users')

router.use('/pages', pages);
router.use('/users', users)

module.exports = router