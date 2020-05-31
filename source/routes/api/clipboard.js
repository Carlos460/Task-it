const router = require('express').Router();
const { getUserData } = require('../../tools/profileData.js')

router.post('/add', (req, res) => {
    // get user data
    res.json({ some: "json" });
    // Make new clipboard
})

router.get('/', (req, res) => {
    res.json({ message: 'You got the message from the clipoard' });
});

module.exports = router;