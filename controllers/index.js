const router = require('express').Router();
const home = require('./homeRoutes.js');
const blog = require('./blogRoutes.js');
const user = require('./userRoutes.js');
const login = require('./loginRoutes.js');
const dashboard = require('./dashboardRoutes.js');
const api = require('./api');

router.use('/', home);
router.use('/blogpost', blog);
router.use('/user', user);
router.use('/api', api);
router.use('/login', login);
router.use('/dashboard', dashboard);

module.exports = router;