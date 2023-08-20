const router = require('express').Router();
const { User, BlogPost } = require('../models');

// redirect to home page if user includes no ID
router.get('/', (req, res) => {
    res.redirect('/');
});

router.get('/:id', async (req, res) => {
    const blogPostData = await BlogPost.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: User,
            required: true,
            attributes: {
                exclude: ['password']
            }
        },
        raw: true
    });
    res.render('blog', { blogPost: blogPostData, loggedIn: req.session.loggedIn });
});

module.exports = router;