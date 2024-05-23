const router = require('express').Router();
const library = require('./library')
const users = require('./userRoutes')

router.use('/library', library);
router.use('/users', users);

module.exports = router;