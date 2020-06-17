const router = require('express').Router();
const Clipboard = require('../../model/Clipboard')
const { getUserData } = require('../../tools/profileData.js')

router.post('/', getUserData, async (req, res) => {
  //getting user id
  const userId = req.userData._id;
  //getting title from body
  const clipboardTitle = req.body.title;
  //making new clipboard with user ID
  const sampleTask = ['sample task']

  const clipboardObj = new Clipboard({
    title: clipboardTitle,
    author: userId,
    tasks: sampleTask
  });

  //sending data to database
  try {
    const savedClipboard = await clipboardObj.save();
    res.json({ message: clipboardTitle, tasks: sampleTask });
  } catch {
    res.json({ message: 'user was not made!' });
  }
});

router.get('/', getUserData, async (req, res) => {
  const userId = req.userData._id;

  const clipboardList = await Clipboard.find({ author: userId });

  res.json(clipboardList);
});

router.delete('/', getUserData, async (req, res) => {
  res.json({ message: 'clipboard got deleted!' })
});

module.exports = router;
