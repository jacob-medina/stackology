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
    console.log(blogPostData)
    res.render('home', { blogPosts: blogPostData, loggedIn: req.session.loggedIn });
});

module.exports = router;