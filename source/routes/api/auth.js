const router = require('express').Router();
const User = require('../../model/User');
const { registerValidation } = require('../../tools/validation');

router.post('/register', async (req, res) => {
    //validating data from request
    const { error, value } = await registerValidation(req.body);
    if (error) return res.status(400).send(error.message);
    //Checking if Email is used
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist');
    // Making new user from the user schema
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
