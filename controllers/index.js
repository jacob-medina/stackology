const router = require('express').Router();
const home = require('./homeRoutes.js');
const blog = require('./blogRoutes.js');
const api = require('./api');

router.use('/', home);
router.use('/blog', blog);
router.use('/api', api);

module.exports = router;