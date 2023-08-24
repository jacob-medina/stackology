const router = require('express').Router();
const user = require('./userRoutes.js');
const blog = require('./blogRoutes.js');

router.use('/user', user);
router.use('/blogpost', blog);

module.exports = router;