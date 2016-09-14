
var express = require('express');
var router = express.Router();
//var io = require('socket.io')(server);


/* GET users listing. */
router.post('/presence', function (req, res, next) {
    console.log(request.body);
    //io.emit("webhook", request.body);    
});

module.exports = router;