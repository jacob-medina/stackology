const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('login', { noNav: true });
});

module.exports = router;