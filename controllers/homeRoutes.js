const router = require('express').Router();
const { User, BlogPost } = require('../models');

router.get('/', async (req, res) => {
    const blogPostData = await BlogPost.findAll({
        include: {
            model: User,
            required: true,
            attributes: {
                exclude: ['password']
            }
        },
        order: [
            ['id', 'DESC']
        ],
        raw: true
    });

    res.render('home', { blogPosts: blogPostData, loggedIn: req.session.loggedIn });
});

module.exports = router;