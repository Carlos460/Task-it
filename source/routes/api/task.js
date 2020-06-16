const router = require('express').Router();
const Clipboard = require('../../model/Clipboard');

router.post('/', (req, res) => {

    const taskText = req.body.taskText;
    const taskParentClipboardTitle = req.body.clipboardTitle;


    res.json(taskText);
})

module.exports = router;