var express = require('express');
var router = express.Router();

/*================================================================
 CREATE SOCKET.IO
 ================================================================*/
function createSocket(req) {
    if (!io.nsps["/" + req.session.xapi.ownerId]) {
        var nsp = io.of("/" + req.session.xapi.ownerId);
        nsp.on('connection', function (socket) {
            console.log("==========");
            console.log("new socket connection on " + req.session.xapi.ownerId);
            socket.emit("message", "You are now connected to the socket!");
        });
    }
}
/*================================================================
 ENTRYU POINT
 ================================================================*/
//router.get('/', createSocket, function (req, res) {
router.get('/', function (req, res) {
    if (req.session.xapi) {
        createSocket(req);
        res.render('web-app', {
            title: 'API Test Tool',
            vpcUrl: req.session.xapi.vpcUrl,
            ownerId: req.session.xapi.ownerId,
            accessToken: req.session.xapi.accessToken,
            type: req.session.xapi.type
        });
    } else res.redirect("/");
});
module.exports = router;
