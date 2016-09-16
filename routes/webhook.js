
var express = require('express');
var router = express.Router();
//var io = require('socket.io')(server);


/* GET users listing. */
router.post('/presence/', function (req, res, next) {
    console.log(req.body);
    io.sockets.connected[req.session.socketio].emit("data", req.body);
});

module.exports = router;