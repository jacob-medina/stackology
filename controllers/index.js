const router = require('express').Router();
const home = require('./homeRoutes.js');
const blog = require('./blogRoutes.js');
const user = require('./userRoutes.js');
const login = require('./loginRoutes.js');
const api = require('./api');

router.use('/', home);
router.use('/blogpost', blog);
router.use('/user', user);
router.use('/api', api);
router.use('/login', login);

module.exports = router;