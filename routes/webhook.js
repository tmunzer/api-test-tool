
var express = require('express');
var router = express.Router();
//var io = require('socket.io')(server);


/* GET users listing. */
router.post('/presence', function (req, res, next) {    
    console.log(req);
    io.sockets.in(req.body.data.ownerId).emit("webhook data", req.body)
    res.send();
});

module.exports = router;