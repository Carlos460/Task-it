const express = require('express');
const router = express.Router();
const { getUserData } = require('../tools/profileData');

router.get('/', getUserData, (req, res) => {
    res.render('profile', { username: req.userData.username });
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;