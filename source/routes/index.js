const express = require('express');
const router = express.Router();
const verifyToken = require('../tools/validtoken');

router.get('/', (req, res) => {
    const token = req.cookies;
    if (token.TastyCookie) return res.status(302).redirect('/profile')
    res.render('index');
});

module.exports = router;
