const router = require('express').Router();
const { getUserData } = require('../../tools/profileData.js')

router.post('/add', (req, res) => {
    // get user data
    let user = "panda";
    console.log(`New clipboard was created from ${user}`);
    res.json({ message: "New clipboard was created!" });
    // Make new clipboard
})

router.get('/', (req, res) => {
    res.json({
        clipboard: {
            title: "Sample to-do list",
            author: "panda",
            tasks: ["get the code done", "fix the button", "finish the last model", "research about other routes"]
        }
    });
});

module.exports = router;