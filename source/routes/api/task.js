const router = require('express').Router();
const Clipboard = require('../../model/Clipboard');

router.post('/', async (req, res) => {

  const taskText = req.body.taskText;
  const taskParentClipboardTitle = req.body.clipboardTitle;

  const clipboard = await Clipboard.findOne({
    title: taskParentClipboardTitle
  });

  const clipboardTasksArray = clipboard.tasks;
  clipboardTasksArray.push(taskText);

  const saveAddedTasks = await Clipboard.updateOne({
    title: taskParentClipboardTitle
  }, {
    $set: {
      tasks: clipboardTasksArray
    }

  });


  res.json(taskText);
});

router.delete('/', async (req, res) => {
  const taskText = req.body.taskText;
  const taskParentClipboardTitle = req.body.title;

  const clipboard = await Clipboard.findOne({
    title: taskParentClipboardTitle
  });

  const clipboardTasksArray = clipboard.tasks;

  const indexOfTask = clipboardTasksArray.indexOf(taskText);
  if (indexOfTask > -1) {
    clipboardTasksArray.splice(indexOfTask, 1);
  }

  const removeTask = await Clipboard.updateOne({
    title: taskParentClipboardTitle
  }, {
    $set: {
      tasks: clipboardTasksArray
    }
  });

  res.json({
    status: 'task deleted!'
  });
});

module.exports = router;