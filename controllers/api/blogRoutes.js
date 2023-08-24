const router = require('express').Router();
const { User, BlogPost } = require('../../models');
const auth = require('../../utils/auth.js');

router.get('/', (req, res) => {
    res.json({message: "Hello!"});
})

router.post('/', auth, async (req, res) => {
    try {
        const { title, content, thumbnail } = req.body;

        if (!title || !content) {
            res.status(400).json({ message: "Title and content required." });
            return;
        }

        if (!req.session.userId) {
            res.status(401).json({ message: "Unauthorized request." });
            return;
        }

        const blogPost = await BlogPost.create(
            {
                title, 
                content, 
                thumbnail, 
                user_id: req.session.userId
            },
            { returning: true, individualHooks: true }
        );

        // res.redirect(`/blogpost/${blogPost.id}`)
        res.status(200).json({
            message: "Post successful!",
            blogID: blogPost.id
        });
    } 
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error has occurred." });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;

    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error has occurred." });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const blogPost = await BlogPost.findByPk(req.params.id, {
            raw: true
        });

        console.log(req.params.id);

        if (!blogPost) {
            res.status(404).json({ message: "Could not find data." });
            return;
        }

        if (blogPost.userId !== req.session.userId) {
            res.status(401).json({ message: "Unauthorized request." });
            return;
        }

        const deleted = await BlogPost.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deleted) {
            res.status(500).json({ message: "A server error has occurred." });
            return;
        }

        res.status(200).json({ message: "Successfully deleted blog post." })
    } 
    catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error has occurred." });
    }
});

module.exports = router;