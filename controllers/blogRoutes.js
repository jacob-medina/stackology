const router = require('express').Router();
const auth = require('../utils/auth.js');
const { User, BlogPost, Comment } = require('../models');

// redirect to home page if user includes no ID
router.get('/', (req, res) => {
    res.redirect('/');
});

router.get('/new', auth, (req, res) => {
    res.render('writeBlog', { 
        newBlog: true,
        writeBlog: true,
        thumbnail: '/images/thumbnail.jpg',
        loggedIn: req.session.loggedIn
    });
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

    const commentData = await Comment.findAll({
        where: {
            blog_post_id: blogPostData.id
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
    console.log(commentData);
    res.render('blog', { blogPost: blogPostData, loggedIn: req.session.loggedIn });
});

router.get('/edit/:id', auth, async (req, res) => {
    try {
        const blogPost = await BlogPost.findByPk(req.params.id, {
            raw: true
        });

        if (!blogPost) {
            res.status(404).json({ message: "Could not find data." });
            return;
        }

        if (blogPost.userId !== req.session.userId) {
            res.status(401).json({ message: "Unauthorized request." });
            return;
        }

        res.render('writeBlog', {
            writeBlog: true,
            loggedIn: req.session.loggedIn,
            title: blogPost.title,
            thumbnail: blogPost.thumbnail,
            content: blogPost.content
        });
    } 
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error has occurred." });
    }
});

module.exports = router;