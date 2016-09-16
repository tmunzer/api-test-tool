var express = require('express');
var router = express.Router();

/*================================================================
 CREATE SOCKET.IO
 ================================================================*/
function createSocket(req, res, next) {
    io.on('connection', function (socket) {
        req.session.socketio = socket.id;
        req.session.save();
        io.sockets.connected[req.session.socketio].emit("hi", req.session.socketio, "test");
    });
    next();
}
/*================================================================
 ENTRYU POINT
 ================================================================*/
router.get('/', createSocket, function (req, res) {
    if (req.session.xapi) {
        res.render('web-app', {
            title: 'API Test Tool',
            server: req.session.xapi.vpcUrl,
            ownerId: req.session.xapi.ownerId,
            accessToken: req.session.xapi.accessToken,
            type: req.session.xapi.type
        });
    } else res.redirect("/");
});
module.exports = router;
