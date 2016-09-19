
var express = require('express');
var router = express.Router();
//var io = require('socket.io')(server);



/* GET users listing. */
router.post('/presence', function (req, res, next) {
    //if (req.session.webhookId == )
    console.log(req.body);
    io.sockets.in(req.session.webhookId).emit("webhook data", req.body)
    res.send();
});

module.exports = router;