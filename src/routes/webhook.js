
var express = require('express');
var router = express.Router();
//var io = require('socket.io')(server);


/* GET users listing. */
router.post('/presence', function (req, res, next) {
    var data = JSON.stringify(req.body);
    if (data.length > 400) console.info("\x1b[34mREQUEST DATA\x1b[0m:", data.substr(0, 400) + '...');
    else console.info("\x1b[34mREQUEST DATA\x1b[0m:", data);
    var nsp = io.of("/" + req.body.data.ownerId);
    nsp.emit("data", req.body)
    //io.sockets.in(req.session.socketio).emit("data", req.body)
    res.send();
});

module.exports = router;