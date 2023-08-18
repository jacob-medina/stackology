const router = require('express').Router();
const { User, BlogPost } = require('../models');

router.get('/', async (req, res) => {
    const blogPostData = await BlogPost.findAll({
        limit: 20,
        include: {
            model: User,
            required: true,
            attributes: {
                exclude: ['password']
            }
        },
        raw: true
    });
    res.render('home', { blogPosts: blogPostData });
});

module.exports = router;