const router = require('express').Router();
const user = require('./userRoutes.js');
const blog = require('./blogRoutes.js');
const comment = require('./commentRoutes.js');
const helper = require('./helperRoutes.js');

router.use('/user', user);
router.use('/blogpost', blog);
router.use('/comment', comment);
router.use('/helper', helper);

module.exports = router;