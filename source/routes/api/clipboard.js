const router = require('express').Router();
const Clipboard = require('../../model/Clipboard')
const { getUserData } = require('../../tools/profileData.js')

router.post('/', getUserData, async (req, res) => {
  //getting user id
  const userId = req.userData._id;
  //getting title from body
  const clipboardTitle = req.body.title;
  //making new clipboard with user ID
  const clipbaordObj = new Clipboard({
    title: clipboardTitle,
    author: userId,
    tasks: ['sample task']
  });

  //sending data to database
  try {
    const savedClipboard = await clipbaordObj.save();
    res.json({ message: clipboardTitle });
  } catch {
    res.json({ message: 'user was not made!' });
  }
});

router.get('/', (req, res) => {
  res.json({
    clipboard: {
      title: "Sample to-do list",
      author: "panda",
      tasks: ["get the code done", "fix the button"
        , "finish the last model", "research about other routes"
        , "get the code done", "fix the button", "finish the last model"
        , "research about other routes"]
    }
  });
});

router.delete('/', (req, res) => {
  res.json({ message: 'clipboard got deleted!' })
});
module.exports = router;
