const router = require('express').Router();
const music = require('./music')
const libraries = require('./libraries')
const users = require('./userRoutes')

router.use('/music', music)
router.use('/libraries', libraries);
router.use('/users', users);

module.exports = router;