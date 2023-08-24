const router = require('express').Router();
const { User, BlogPost } = require('../models');
const auth = require('../utils/auth.js');

router.get('/', auth, async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(500).json({ message: "A server error has occurred." });
            return;
        }

        const userData = User.findByPk(req.session.userId, {
            attributes: {
                exclude: ['password']
            }
        });

        if (!userData) {
            res.status(404).json({ message: "Could not find user data." });
            return;
        }

        const blogPosts = await BlogPost.findAll({
            where: {
                user_id: req.session.userId
            },
            include: User,
            raw: true
        });

        res.render('dashboard', { user: userData, blogPosts: blogPosts, loggedIn: req.session.loggedIn });

    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error has occurred." });
        return;
    }
});

module.exports = router;