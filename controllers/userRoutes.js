const router = require('express').Router();
const { User, BlogPost } = require('../models');

// redirect to home page if user includes no ID
router.get('/', (req, res) => {
    res.redirect('/');
});

router.get('/:id', async (req, res) => {
    const userData = await User.findAll({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        },
        include: {
            model: BlogPost,
            required: true,
        },
        raw: true
    });
    console.log(userData);
    res.render('user', { user: userData });
});

module.exports = router;