var express = require('express');
var router = express.Router();
var OAuth = require("./../bin/aerohive/api/oauth");
var ApiConf = require("./../bin/aerohive/config").aerohive;
var Error = require("./../routes/error");

router.get('/reg', function (req, res) {
    if (req.session) {
        if (req.query.hasOwnProperty('error')) {
            Error.render(req.query.error, "conf", req, res);
        } else if (req.query.hasOwnProperty("authCode")) {
            var authCode = req.query.authCode;
            OAuth.getPermanentToken(authCode, ApiConf, function (data) {
                if (data.hasOwnProperty("error")) Error.render(data.error, "conf", req, res);
                else if (data.hasOwnProperty("data")) {
                    for (var owner in data.data) {
                        req.session.xapi = {
                            rejectUnauthorized: true,
                            vpcUrl: data.data[owner].vpcUrl.replace("https://", ""),
                            ownerId: data.data[owner].ownerId,
                            accessToken: data.data[owner].accessToken,
                            hmngType: "public"
                        };

                    }
                    console.log(req.session);
                    res.redirect('/web-app/');
                }
            });
        } else Error.render("Unknown error", "conf", req, res);
    } else res.redirect("/");    
});

module.exports = router;