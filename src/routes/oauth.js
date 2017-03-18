var express = require('express');
var router = express.Router();
var OAuth = require("./../bin/aerohive/api/oauth");
var devAccount = require("../config").devAccount;
var Error = require("./../routes/error");

router.get('/reg', function (req, res) {
    if (req.session) {
        if (req.query.error)
            Error.render(
                { status: 401, message: "OAuth process error. The authorization server responded " + req.query.error },
                req.originalUrl,
                req,
                res);
        else if (req.query.authCode) {
            var authCode = req.query.authCode;
            OAuth.getPermanentToken(authCode, devAccount, function (data) {
                if (data.error)
                    Error.render(
                        { status: 401, message: "OAuth process error. The authorization didn't validated the authorization code: " + req.query.error },
                        req.originalUrl,
                        req,
                        res);
                else if (data.data) {
                    for (var owner in data.data) {
                        req.session.xapi = {
                            rejectUnauthorized: true,
                            vpcUrl: data.data[owner].vpcUrl.replace("https://", ""),
                            ownerId: data.data[owner].ownerId,
                            accessToken: data.data[owner].accessToken,
                            hmngType: "public"
                        };

                    }
                    res.redirect('/web-app/');
                }
            });
        } else
            Error.render(
                { status: 500, message: "Unable to retrieve the authorization code from the authorization server" },
                req.originalUrl,
                req,
                res);
    } else res.redirect("/");
});

module.exports = router;