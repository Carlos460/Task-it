const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const token = req.cookies;
  if (token.TastyCookie) return res.status(302).redirect('/profile')
  res.render('index');

});
module.exports = router;