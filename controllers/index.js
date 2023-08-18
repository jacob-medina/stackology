const router = require('express').Router();
const home = require('./homeRoutes.js');
const blog = require('./blogRoutes.js');
const user = require('./userRoutes.js');
const api = require('./api');

router.use('/', home);
router.use('/blogpost', blog);
router.use('/user', user);
router.use('/api', api);

module.exports = router;