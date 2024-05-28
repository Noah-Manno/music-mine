const router = require('express').Router();
const music = require('./music')
const libraries = require('./libraries')
const concerts = require('./concerts')
const users = require('./userRoutes')

router.use('/users', users);
router.use('/libraries', libraries);
router.use('/music', music)
router.use('/concerts', concerts)


module.exports = router;