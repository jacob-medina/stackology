const router = require('express').Router();
const helpers = require('../../utils/helpers.js');

router.get('/formatDate/:date', (req, res) => {
    try {
        const formattedDate = helpers.format_date(req.params.date);
        res.status(200).json({ date: formattedDate });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "A server error occurred." });
    }
})

module.exports = router;