var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
