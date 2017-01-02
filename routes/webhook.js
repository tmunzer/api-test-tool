
var express = require('express');
var router = express.Router();
//var io = require('socket.io')(server);


/* GET users listing. */
router.post('/presence', function (req, res, next) {    
    console.log(req.body);
    var nsp = io.of("/"+req.body.data.ownerId);
    nsp.emit("data", req.body)
    //io.sockets.in(req.session.socketio).emit("data", req.body)
    res.send();
});

module.exports = router;