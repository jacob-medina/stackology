const router = require('express').Router();
const user = require('./userRoutes.js');
const blog = require('./blogRoutes.js');
const comment = require('./commentRoutes.js');

router.use('/user', user);
router.use('/blogpost', blog);
router.use('/comment', comment);

module.exports = router;