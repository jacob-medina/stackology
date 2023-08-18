const router = require('express').Router();
const { User, BlogPost } = require('../models');

// redirect to home page if user includes no ID
router.get('/', (req, res) => {
    res.redirect('/');
});

router.get('/:id', async (req, res) => {
    const userData = await User.findByPk(req.params.id, {
        attributes: {
            exclude: ['password']
        },
        raw: true
    });

    const blogPosts = await BlogPost.findAll({
        where: {
            user_id: req.params.id
        },
        include: User,
        raw: true
    });
    res.render('user', { user: userData, blogPosts: blogPosts});
});

module.exports = router;