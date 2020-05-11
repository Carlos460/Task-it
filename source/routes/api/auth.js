const router = require('express').Router();
const User = require('../../model/User');
const bycrypt = require('bcryptjs');
const {
    registerValidation,
    loginValidation,
} = require('../../tools/validation');

router.post('/register', async (req, res) => {
    //validating data from request
    const error = registerValidation(req.body);
    if (error) return res.status(400).send(error.message);

    //Checking if Email is used
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist');

    //secret password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(req.body.password, salt);

    // Making new user from the user schema
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.status(200).send(user._id);
    } catch (err) {
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req, res) => {
    //Validating data from request
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.message);

    //Getting data from the database
    const user = await User.findOne({ username: req.body.username });
    if (!user)
        return res.status(400).send('User Name and/or Password is wrong');

    //Validating Password
    const validPass = await bycrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    res.send('logged In !!!');
});

module.exports = router;
