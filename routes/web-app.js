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
            //console.log(socket);
            for (nspid in socket.nsp){
                console.log(nspid)
                console.log("_______");
                if (nspid.name == "/"+req.session.xapi.ownerId){
                    console.log(nspid.server.connected);
                }
            }
            socket.emit("message", "You are now connected to the socket!");
            socket.on('update', function (action) {
                socket.emit("update", action); // send the update message to the sender
                socket.broadcast.emit("update", action); // send the update message to everyone in this nsp BUT the sender
            });
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
