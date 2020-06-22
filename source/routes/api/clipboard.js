const router = require('express').Router();
const Clipboard = require('../../model/Clipboard')
const {
  getUserData
} = require('../../tools/profileData.js')

router.post('/', getUserData, async (req, res) => {
  //getting user id
  const userId = req.userData._id;
  //getting title from body
  const clipboardTitle = req.body.title;
  //making new clipboard
  const clipboardObj = new Clipboard({
    title: clipboardTitle,
    author: userId,
    tasks: []
  });

  //sending data to database
  try {
    const savedClipboard = await clipboardObj.save();
    res.json({
      title: clipboardTitle
    });
  } catch {
    res.json({
      message: 'user was not made!'
    });
  }
});

router.get('/', getUserData, async (req, res) => {
  const userId = req.userData._id;

  const clipboardList = await Clipboard.find({
    author: userId
  });
  res.json(clipboardList);
});

router.delete('/', getUserData, async (req, res) => {
  const clipboardTitle = req.body.title;

  const clipboard = await Clipboard.deleteOne({
    title: clipboardTitle
  });

  res.json({
    status: clipboardTitle
  });
});

module.exports = router;