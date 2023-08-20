const router = require('express').Router();
const user = require('./userRoutes.js');

router.use('/user', user);

module.exports = router;