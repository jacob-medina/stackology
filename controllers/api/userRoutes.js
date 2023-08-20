const router = require('express').Router();
const { User, BlogPost } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const { name: username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: "Username and password required." });
            return;
        }
        
        const user = await User.findOne({
            where: {
                name: username
            }
        });

        if (!user) {
            res.status(400).json({ message: "Username or password was incorrect." });
            return;
        }
        
        if (!user.checkPassword(password)) {
            res.status(400).json({ message: "Username or password was incorrect." });
            return;
        }
        
        req.session.save(() => {
            req.session.loggedIn = true;
        });
        
        res.status(200).json({ message: "Logged in!" });
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;