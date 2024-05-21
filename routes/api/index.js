const router = require('express').Router();
const add = require('./add')
const users = require('./userRoutes')

router.use('/add', add);
router.use('/users', users);

module.exports = router;