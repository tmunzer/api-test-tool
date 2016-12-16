var express = require('express');
var router = express.Router();
var API = require("./../bin/aerohive/api/main");

var devAccount = require("../config").devAccount;

function checkApi(req, res, next) {
    if (req.session.xapi) next();
    else res.status(401).send({ error: "Session not found" });
}


function sendError(res, request, err) {
    var errStatus = 500;
    if (err.status) errStatus = err.status;
    res.status(err.status).send({ error: err, request: request });
}
function sendSuccess(res, response, request) {
    res.json({ response: response, request: request });
}
function sendReponse(res, err, response, request) {
        if (err) sendError(res, request, err);
        else sendSuccess(res, response, request);
}
/**
 * CONFIGURATION Location
 */
router.get("/configuration/apiLocationFolder", checkApi, function (req, res) {
    if (req.query.locationId) {
        API.configuration.locations.location(req.session.xapi, devAccount, req.query.locationId, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(500).send({ error: "locationId has to passed into request query." });
})
router.get("/configuration/apiLocationFolders", checkApi, function (req, res, next) {
    API.configuration.locations.locations(req.session.xapi, devAccount, function (err, response, request) {
        sendReponse(res, err, response, request);
    })
})
/**
 * CONFIGURATION SSID
 */
router.get("/configuration/device/ssids", checkApi, function (req, res, next) {
    if (req.query.deviceId) {
        API.configuration.ssids.ssidForDevice(req.session.xapi, devAccount, req.query.deviceId, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(500).send({ error: "deviceId has to passed into request query." });
})
router.get("/configuration/ssid/psk", checkApi, function (req, res, next) {
    if (req.query.ssidProfileId) {
        API.configuration.ssids.pskForSsid(req.session.xapi, devAccount, req.query.ssidProfileId, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(500).send({ error: "ssidProfileId has to passed into request query." });
})
router.get("/configuration/ssids", checkApi, function (req, res, next) {
    API.configuration.ssids.ssidProfiles(req.session.xapi, devAccount, function (err, response, request) {
        sendReponse(res, err, response, request);
    })
})

router.get("/configuration/ssids/filters", checkApi, function (req, res, next) {
    if (req.query.ssidProfileId) {
        API.configuration.ssidFilters.ssidForDevice(req.session.xapi, devAccount, req.query.ssidProfileId, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(500).send({ error: "ssidProfileId has to passed into request query." });
})
/**
 * CONFIGURATION webhooks
 */

router.get("/configuration/webhooks/eventTypes", checkApi, function (req, res, next) {
    API.configuration.webhooks.eventTypes(req.session.xapi, devAccount, function (err, response, request) {
        sendReponse(res, err, response, request)
    })
})
router.get("/configuration/webhooks/messageTypes", checkApi, function (req, res, next) {

    if (req.query.eventType) {
    API.configuration.webhooks.messageTypes(req.session.xapi, devAccount, req.query.eventType, function (err, response, request) {
        sendReponse(res, err, response, request)
    })
    } else res.status(500).send({ error: "eventType has to passed into request query." });    
})
router.get("/configuration/webhooks", checkApi, function (req, res, next) {
    API.configuration.webhooks.get(req.session.xapi, devAccount, function (err, response, request) {
        sendReponse(res, err, response, request)
    })
})
function checkWebhook(req, callback) {
    API.configuration.webhooks.get(req.session.xapi, devAccount, function (err, response, request) {
        if (err) callback(err, null);
        else {
            var webhook;
            response.forEach(function (wh) {
                if (
                    wh.ownerId == req.session.xapi.ownerId
                    //&& wh.application == "ApiTestTool"
                    //&& wh.secret == req.session.xapi.vpcUrl + req.session.xapi.ownerId
                    && wh.url == "https://check.ah-lab.fr/webhook/presence"
                ) {
                    webhook = wh;
                    req.session.webhookId = wh.id;
                    req.session.save();
                };
            });
            callback(null, webhook);
        }
    })
}
router.post("/configuration/webhooks", checkApi, function (req, res, next) {
    var subscription;
    if (req.body.webhook) subscription = {
            "application": req.body.webhook.application,
            "secret": req.body.webhook.secret,
            "url": req.body.webhook.url,
            "eventType": req.body.webhook.eventType,
            "messageType": req.body.webhook.messageType
    }
    else subscription = {
            "application": "ApiTestTool",            
            "secret": req.session.xapi.vpcUrl + req.session.xapi.ownerId,
            "url": "https://check.ah-lab.fr/webhook/presence",
            "eventType": "LOCATION",
            "messageType": "LOCATION_CLIENT_CENTRIC"
        }
    if (req.session.xapi.ownerId) {
        subscription.ownerId = req.session.xapi.ownerId;
        API.configuration.webhooks.create(req.session.xapi, devAccount, subscription, function (err, response, request) {
            if (err) {
                if (err.code == "core.service.data.can.not.persist.object") {
                    checkWebhook(req, function (err2, response2) {
                        sendReponse(res, err2, response2, request);                        
                    });
                } else res.status(err.status).send({ error: err, request: request });
            } else {
                req.session.webhookId = response.id;
                req.session.save();
                res.json({ response: response, request: request });
            }
        })
    } else res.status("404").send("ownerId not present in session.");
})
router.delete("/configuration/webhooks", checkApi, function (req, res, next) {
    var webhookId;
    if (req.query.webhookId) webhookId = req.query.webhookId;
    else if (req.session.webhookId) {
        webhookId = req.session.webhookId;
        io.sockets.in(req.session.webhookId).emit("message", "test");
    }
    if (webhookId) {   
        API.configuration.webhooks.remove(req.session.xapi, devAccount, webhookId, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status("404").send("webhookId not present in session.");
})

/**
 * IDENTITY
 */
router.get("/identity/credentials", checkApi, function (req, res, next) {
    API.identity.credentials.getCredentials(req.session.xapi, devAccount, null, null, null, null, null, null, null, null, null, null, null, null, function (err, response, request) {
        sendReponse(res, err, response, request);
    })
})
router.get("/identity/userGroups", checkApi, function (req, res, next) {
    API.identity.userGroups.getUserGroups(req.session.xapi, devAccount, null, null, function (err, response, request) {
        sendReponse(res, err, response, request);
    })
})

/**
 * LOCATION
 */
router.get("/location/clients", checkApi, function (req, res, next) {
    if (req.query.apMacs) {
    API.location.clients(req.session.xapi, devAccount, req.query.apMacs, function (err, response, request) {
        if (err) res.status(err.status).send({ error: err, request: request });
        else res.json({ response: response, request: request });
    })
    } else res.status(500).send({ error: "apMacs has to passed into request query." });
})

/**
 * MONITOR
 */
router.get("/monitor/client", checkApi, function (req, res, next) {
    if (req.query.clientId) {
        API.monitor.clients.client(req.session.xapi, devAccount, req.query.clientId, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(500).send({ error: "clientId has to passed into request query." });
})
router.get("/monitor/clients", checkApi, function (req, res, next) {
    API.monitor.clients.clients(req.session.xapi, devAccount, function (err, response, request) {
        sendReponse(res, err, response, request);
    })
})

router.get("/monitor/device", checkApi, function (req, res, next) {
    if (req.query.deviceId) {
        API.monitor.devices.device(req.session.xapi, devAccount, req.query.deviceId, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(500).send({ error: "deviceId has to passed into request query." });
})
router.get("/monitor/devices", checkApi, function (req, res, next) {
    API.monitor.devices.devices(req.session.xapi, devAccount, function (err, response, request) {
        sendReponse(res, err, response, request);
    })
})

/**
 * PRESENCE
 */
router.get("/presence/clientcount", checkApi, function (req, res, next) {
    if (req.query.locationId) {
        var endTime = new Date().toISOString();
        var startTime = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        API.presence.clientlocation.clientcount(req.session.xapi, devAccount, req.query.locationId, startTime, endTime, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(401).send("Error: no locationId");
})
router.get("/presence/clientpresence",  checkApi,function (req, res, next) {
    if (req.query.locationId) {
        var endTime = new Date().toISOString();
        var startTime = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        var timeUnit = "OneHour";
        API.presence.clientlocation.clientpresence(req.session.xapi, devAccount, req.query.locationId, startTime, endTime, timeUnit, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(401).send("Error: no locationId");
})
router.get("/presence/clientsessions", checkApi, function (req, res, next) {
    if (req.query.locationId) {
        var endTime = new Date().toISOString();
        var startTime = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        API.presence.clientlocation.clientsessions(req.session.xapi, devAccount, req.query.locationId, true, startTime, endTime, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(401).send("Error: no locationId");
})
router.get("/presence/clienttimeseries",  checkApi,function (req, res, next) {
    if (req.query.locationId) {
        var endTime = new Date().toISOString();
        var startTime = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        var timeUnit = "OneHour";
        API.presence.clientlocation.clienttimeseries(req.session.xapi, devAccount, req.query.locationId, startTime, endTime, timeUnit, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(401).send("Error: no locationId");
})
router.get("/presence/waypoints", checkApi, function (req, res, next) {
    if (req.query.locationId) {
        var endTime = new Date().toISOString();
        var startTime = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        API.presence.clientlocation.waypoints(req.session.xapi, devAccount, req.query.locationId, startTime, endTime, function (err, response, request) {
            sendReponse(res, err, response, request);
        })
    } else res.status(401).send("Error: no locationId");
})

module.exports = router;
