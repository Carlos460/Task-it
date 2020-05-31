const router = require('express').Router();
const { getUserData } = require('../../tools/profileData.js')

router.post('/add', (req, res) => {
    // get user data
    res.send({ some: "json" });
    // Make new clipboard
})

router.get('/:id', (req, res) => {
    res.json({ message: 'You got the message from the clipoard' });
});

module.exports = router;