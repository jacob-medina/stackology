const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const auth = require('../../utils/auth.js');

router.post('/', auth, async (req, res) => {
    try {
        const { text, blog_post_id } = req.body;

        if (!req.session.userId) {
            res.status(401).json({ message: "Unauthorized request." });
            return;
        }

        const blogPost = await BlogPost.findByPk(blog_post_id);

        if (!blogPost) {
            res.status(404).json({ message: `Could not find blog post with id ${blog_post_id}` });
            return;
        }

        const newComment = await Comment.create({
            text,
            blog_post_id,
            user_id: req.session.userId,
        });

        res.status(200).json(newComment);

    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error has occurred." });
    }
});

module.exports = router;