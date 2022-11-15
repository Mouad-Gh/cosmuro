const express = require('express');
const router = express.Router();
const path = require('path');

//router can recognize regex
//^/$ means at the beginning of the string only(^) and at the end only($), that means this will only matchif the requested route is only a slash
//| means or
//(.html)? means it's optional so they could request just the slash or maybe just the slash index without the dot html or the user could request the full index.html which would also work
router.get('^/$|/index(.html)?', (req,res)=>{
    // send a file back
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});


module.exports = router;