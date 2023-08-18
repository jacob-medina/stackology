const router = require('express').Router();

// redirect to home page if user includes no ID
router.get('/', (req, res) => {
    res.redirect('/');
});

router.get('/:id', (req, res) => {
    res.render('blog');
});

module.exports = router;