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
})

module.exports = router;