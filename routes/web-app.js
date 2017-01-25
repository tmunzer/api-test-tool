var express = require('express');
var router = express.Router();

var API = require("./../bin/aerohive/api/main");
var devAccount = require("../config").devAccount;

/*================================================================
 CREATE SOCKET.IO
 ================================================================*/
function createSocket(req) {
    //if (!io.nsps["/" + req.session.xapi.ownerId]) {
    var nsp = io.of("/" + req.session.xapi.ownerId);
    nsp.on('connection', function (socket) {
        socket.emit("message", "You are now connected to the socket!");
        socket.on("update", function (action) {
            socket.emit("update", action); // send the update message to the sender
            socket.broadcast.emit("update", action); // send the update message to everyone in this nsp BUT the sender
        });
        socket.on("disconnect", function () {
            console.log("==========");
            console.log("connection to namespace /" + req.session.xapi.ownerId + "closed");
            setTimeout(function () {
                var count = 0;
                for (var prop in socket.nsp.connected) {
                    if (obj.hasOwnProperty(prop))
                        ++count;
                }
                if (count == 0)
                    API.configuration.webhooks.remove(
                        req.session.xapi,
                        devAccount,
                        req.query.webhookId,
                        function (err, response, request) {
                            if (err) console.log(err);
                            else console.log("Webhook removed for account " + req.session.xapi.ownerId);
                        })
            }, 5000);

        });

        console.log("==========");
        console.log("new socket connection on namespace /" + req.session.xapi.ownerId);

    });

    //}
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
