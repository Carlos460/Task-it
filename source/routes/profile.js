const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('profile', { username: 'username passed with ejs' });
});

router.get('/login', (req, res) => {

    res.render('login');
});

module.exports = router;