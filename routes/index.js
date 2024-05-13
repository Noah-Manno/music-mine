const router = require('express').Router();

const musicRouter = require('./add')
router.use('/add', musicRouter)

module.exports = router;