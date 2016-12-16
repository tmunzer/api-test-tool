angular.module('Check').controller("CheckCtrl", function ($scope, $location, $anchorScroll) {
    $scope.goTo = function (anchor) {
        $anchorScroll(anchor);
    };
});
angular.module('Check').controller("EndpointCtrl", function ($scope, $mdDialog, endpointService) {
    var locationId, deviceId, clientId, ssidProfileId, apMacs, eventType;
    var requests = {};
    var initialized = false;

    $scope.apiCalls = {
        configurationLocations: {
            key: "configuration-device-location",
            name: "Device Location Endpoints",
            endpoints: [
                {
                    name: "configuration/apiLocationFolder",
                    method: "GET",
                    endpoint: "/v1/configuration/apLocationFolders/{folderId}{?ownerId}",
                    description: "Allows one to retrieve a Location Folder node anywhere within the hierarchy.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    locationId: true
                },
                {
                    name: "configuration/apiLocationFolders",
                    method: "GET",
                    endpoint: "/v1/configuration/apLocationFolders{?ownerId}",
                    description: "Exposes the Location Folder Hierarchy that a customer uses to associate non-geographic location information with an Access Point/Device.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    action: "locationId"
                }
            ]
        },
        configurationSsids: {
            key: "configuration-ssid",
            name: "Configuration Endpoints for SSID related operations",
            endpoints: [
                {
                    name: "configuration/device/ssids",
                    method: "GET",
                    endpoint: "/beta/configuration/devices/{deviceId}/ssids{?ownerId}",
                    descriptions: "Retrieves SSID related configuration information for the specified device.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    deviceId: true
                },
                {
                    name: "configuration/ssid/psk",
                    method: "GET",
                    endpoint: "/beta/configuration/ssids/{ssidProfileId}/psk{?ownerId}",
                    descriptions: "Provides information about the configured Pre-shared Key or Private Pre-shared Key for the specified SSID.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    ssidProfileId: true
                },
                {
                    name: "configuration/ssids",
                    method: "GET",
                    endpoint: "/beta/configuration/ssids{?ownerId}",
                    descriptions: "Provides information about the configured SSID Profiles.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    action: "ssidProfileId"
                }
            ]
        },
        configurationSsidFilter: {
            key: "configuration-ssid-profile-filter",
            name: "Configuration Endpoints for SSID Profile Filtering.",
            endpoints: [
                {
                    name: "configuration/ssids/filters",
                    method: "GET",
                    endpoint: "/beta/configuration/ssids/{ssidProfileId}/filters{?ownerId}",
                    descriptions: "Get the Filtering Rules for the given SSID Profile ID",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    ssidProfileId: true
                }
            ]
        },
        configurationWebhooks: {
            key: "configuration-webhooks",
            name: "Configuration Endpoints for Webhook Subscriptions",
            endpoints: [
                {
                    name: "configuration/webhooks/eventTypes",
                    method: "GET",
                    endpoint: "/beta/configuration/webhooks/eventTypes{?ownerId}",
                    description: "rovides a list of all supported Event Types available for subscription.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    action: "eventType"
                },
                {
                    name: "configuration/webhooks/messageTypes",
                    method: "GET",
                    endpoint: "/beta/configuration/webhooks/messageTypes{?ownerId,eventType}",
                    description: "Provides a list of all supported Message Types for the specified Event Type.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    eventType: true
                },
                {
                    name: "configuration/webhooks",
                    method: "GET",
                    endpoint: "/beta/configuration/webhooks{?ownerId}",
                    description: "Provides access to the list of current Webhook subscriptions.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false
                }
            ]
        },
        identityCredentials: {
            key: "identity-management-credentials",
            name: "Credential Management Endpoints",
            endpoints: [
                {
                    name: "identity/credentials",
                    method: "GET",
                    endpoint: "/v1/identity/credentials{?credentialType,ownerId,memberOf,adUser,creator,loginName,firstName,lastName,phone,email,userGroup,page,pageSize}",
                    description: "Allows one to query collection of credentials given query parameters as input.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false
                }
            ]
        },
        identityUserGroups: {
            key: "identity-management-user-groups",
            name: "User Group Management Endpoints",
            endpoints: [
                {
                    name: "identity/usergroups",
                    method: "GET",
                    endpoint: "/v1/identity/userGroups{?ownerId,memberOf,adUser}",
                    description: "Allows one to query the collection of user groups given query parameters as input.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false
                }
            ]
        },
        locationRealtime: {
            key: "location-realtime",
            name: "Location Endpoints for Current Client Geo-Location Information",
            endpoints: [
                {
                    name: "location/clients",
                    method: "GET",
                    endpoint: "/v1/location/clients{?ownerId,apMacs}",
                    description: "Returns a list of current client location observations for each requested AP.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    apMacs: true
                }
            ]
        },
        monitorClients: {
            key: "monitoring-client-devices",
            name: "Monitoring Endpoints for Client Devices Connected to Aerohive Devices",
            endpoints: [
                {
                    name: "monitor/client",
                    method: "GET",
                    endpoint: "/v1/monitor/clients/{clientId}{?ownerId,startTime,endTime,timeUnit}",
                    description: "Returns detail information about a specific client.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    clientId: true
                },
                {
                    name: "monitor/clients",
                    method: "GET",
                    endpoint: "/v1/monitor/clients{?ownerId,startTime,endTime,page,pageSize}",
                    description: "Returns a list of clients.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    action: "clientId"
                }
            ]
        },
        monitorDevices: {
            key: "monitoring-devices",
            name: "Device Monitoring Endpoints",
            endpoints: [
                {
                    name: "monitor/device",
                    method: "GET",
                    endpoint: "/v1/monitor/devices/{deviceId}{?ownerId}",
                    description: "Returns details regarding the specified device.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    deviceId: true,
                    action: "apMacs"
                },
                {
                    name: "monitor/devices",
                    method: "GET",
                    endpoint: "/v1/monitor/devices{?ownerId,showActiveClientCount,page,pageSize}",
                    description: "Returns a list of devices.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    action: "deviceId"
                }
            ]

        },
        presenceAnalytics: {
            key: "presence-analytics",
            name: " Presence Analytics Endpoints",
            endpoints: [
                {
                    name: "presence/clientcount",
                    method: "GET",
                    endpoint: "/v1/clientlocation/clientcount{?ownerId,apmac,location,startTime,endTime}",
                    description: "Returns a count of the number of clients seen during the specified time period with a timeUnit of OneHour.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    locationId: true
                },
                {
                    name: "presence/clientpresence",
                    method: "GET",
                    endpoint: "/v1/clientlocation/clientpresence{?ownerId,apmac,location,timeUnit,startTime,endTime}",
                    description: "Returns a list of distinct clients during the specified time period broken down by the specified time unit.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    locationId: true
                },
                {
                    name: "presence/clientsessions",
                    method: "GET",
                    endpoint: "/v1/clientlocation/clientsessions{?ownerId,location,waypoints,startTime,endTime}",
                    description: "Returns a list of client sessions and waypoints during the specified time period.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    locationId: true
                },
                {
                    name: "presence/clienttimeseries",
                    method: "GET",
                    endpoint: "/v1/clientlocation/clienttimeseries{?ownerId,apmac,location,timeUnit,startTime,endTime}",
                    description: "Returns a count of the number of clients seen during the specified time period broken down by the specified time unit.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    locationId: true
                },
                {
                    name: "presence/waypoints",
                    method: "GET",
                    endpoint: "/v1/clientlocation/waypoints{?ownerId,location,startTime,endTime}",
                    description: "Returns a list of client sessions and waypoints during the specified time period.",
                    status: 0,
                    request: null,
                    body: {},
                    reponse: null,
                    error: null,
                    started: false,
                    loaded: false,
                    locationId: true
                }
            ]
        }
    };

    $scope.apiCallSuccess = function (apiCall) {
        var done = 0;
        apiCall.endpoints.forEach(function (endpoint) {
            if (endpoint.response) done++;
        })
        return done;
    }
    $scope.apiCallError = function (apiCall) {
        var error = 0;
        apiCall.endpoints.forEach(function (endpoint) {
            if (endpoint.error) error++;
        })
        return error;
    }
    $scope.apiCallFinished = function (apiCall) {
        var finished = 0;
        apiCall.endpoints.forEach(function (endpoint) {
            if (endpoint.loaded) finished++;
        })
        return finished;
    }

    $scope.refreshApiCall = function (apiCall) {
        apiCall.endpoints.forEach(function (endpoint) {
            $scope.generateRequest(endpoint);
        })
    }

    $scope.generateRequest = function (endpoint) {
        if (requests[endpoint.name]) requests[endpoint.name].abort();
        endpoint.loaded = false;
        endpoint.started = true;
        if (endpoint.locationId == true) requests[endpoint.name] = endpointService.locationId(endpoint, locationId);
        else if (endpoint.deviceId == true) requests[endpoint.name] = endpointService.deviceId(endpoint, deviceId);
        else if (endpoint.clientId == true) requests[endpoint.name] = endpointService.clientId(endpoint, clientId);
        else if (endpoint.ssidProfileId == true) requests[endpoint.name] = endpointService.ssidProfileId(endpoint, ssidProfileId);
        else if (endpoint.apMacs == true) requests[endpoint.name] = endpointService.apMacs(endpoint, apMacs);
        else if (endpoint.eventType == true) requests[endpoint.name] = endpointService.eventType(endpoint, eventType);
        else requests[endpoint.name] = endpointService.noId(endpoint);
        requests[endpoint.name].then(function (promise) {
            if (promise) {
                endpoint.status = promise.status;
                endpoint.response = promise.data.response;
                endpoint.error = promise.data.error;
                endpoint.request = promise.data.request;
                endpoint.body = promise.data.body;
                endpoint.loaded = true;
                if (endpoint.action == "locationId") setLocationId(endpoint.status, endpoint.response);
                else if (endpoint.action == "deviceId") setDeviceId(endpoint.status, endpoint.response);
                else if (endpoint.action == "clientId") setClientId(endpoint.status, endpoint.response);
                else if (endpoint.action == "ssidProfileId") setSsidProfileId(endpoint.status, endpoint.response);
                else if (endpoint.action == "apMacs") setApMacs(endpoint.status, endpoint.response);
                else if (endpoint.action == "eventType") setEventType(endpoint.status, endpoint.response);
            }
        });
    }


    function setLocationId(status, response) {
        if (status == 200) {
            locationId = response.id;
            for (var apiCall in $scope.apiCalls) {
                $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                    if (endpoint.locationId == true && endpoint.started == false) $scope.generateRequest(endpoint);
                })
            }
        }
    }
    function setDeviceId(status, response) {
        if (status == 200 && response.length > 0) {
            deviceId = response[0].deviceId;
            for (var apiCall in $scope.apiCalls) {
                $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                    if (endpoint.deviceId == true && endpoint.started == false) $scope.generateRequest(endpoint);
                })
            }
        }
    }
    function setClientId(status, response) {
        if (status == 200 && response.length > 0) {
            clientId = response[0].clientId;
            for (var apiCall in $scope.apiCalls) {
                $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                    if (endpoint.clientId == true && endpoint.started == false) $scope.generateRequest(endpoint);
                })
            }
        }
    }
    function setSsidProfileId(status, response) {
        if (status == 200 && response.length > 0) {
            var i = 0;
            while (ssidProfileId == undefined) {
                if (response[i].name != "ssid0") ssidProfileId = response[i].id;
                else i++;
            }

            for (var apiCall in $scope.apiCalls) {
                $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                    if (endpoint.ssidProfileId == true && endpoint.started == false) $scope.generateRequest(endpoint);
                })
            }
        }
    }
    function setApMacs(status, response) {
        if (status == 200) {
            apMacs = response.macAddress;
            for (var apiCall in $scope.apiCalls) {
                $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                    if (endpoint.apMacs == true && endpoint.started == false) $scope.generateRequest(endpoint);
                })
            }
        }
    }
    function setEventType(status, response) {
        if (status == 200) {
            eventType = response[0];
            for (var apiCall in $scope.apiCalls) {
                $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                    if (endpoint.eventType == true && endpoint.started == false) $scope.generateRequest(endpoint);
                })
            }
        }
    }
    $scope.showDetails = function (endpoint) {
        $mdDialog.show({
            controller: 'DialogDetailsController',
            templateUrl: 'modals/modalDetailsContent.html',
            locals: {
                items: endpoint
            }
        });
    };

    // entry point
    if (!initialized) {
        initialized = true;
        for (var apiCall in $scope.apiCalls) {
            $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                if (!endpoint.locationId
                    && !endpoint.deviceId
                    && !endpoint.clientId
                    && !endpoint.ssidProfileId
                    && !endpoint.apMacs
                    && !endpoint.eventType
                ) a=1//$scope.generateRequest(endpoint);
            })
        }
    }
});


angular.module('Check').controller("WebhookCtrl", function ($scope, $mdDialog, $interval, webhookService, endpointService, socketio) {
    var requestWebhook;

    // Registered webhooks    
    $scope.requestCurrentWebhook = undefined;
    $scope.selectedCurrentWebhooks = [];
    $scope.currentWebhooks = undefined;
    $scope.query = {
        order: 'application',
        limit: 5,
        page: 1
    };

    function success(desserts) {
        $scope.desserts = desserts;
    }

    $scope.getCurrentWebhooks = function () {
        if ($scope.requestCurrentWebhook) $scope.requestCurrentWebhook.abort();
        $scope.requestCurrentWebhook = webhookService.getCurrent();
        $scope.requestCurrentWebhook.then(function (promise) {
            if (promise && promise.error) apiWarning(promise.error);
            else $scope.currentWebhooks = promise.data.response;
        });
    };

    $scope.deleteCurrentWebhooks = function () {
        $scope.selectedCurrentWebhooks.forEach(function (toDelete) {
            var request = webhookService.deleteWebhook(toDelete);
            request.then(function (promise) {
                if (promise) {
                    $scope.getCurrentWebhooks();
                }
            });
        })
    }

    // register new webhook
    $scope.eventTypes = undefined;
    $scope.messageTypes = ["Please select an \"Event Type\" first."];

    $scope.webhook = {
        application: "",
        secret: "",
        url: "",
        eventType: undefined,
        messageType: undefined
    }

    function getEventTypes() {
        var request = endpointService.noId({ name: "configuration/webhooks/eventTypes", method: "GET" })
        request.then(function (promise) {
            if (promise && promise.err) alert(promise.err);
            else $scope.eventTypes = promise.data.response;
        })
    }

    $scope.$watch("webhook.eventType", function () {
        if ($scope.webhook.eventType != undefined) {
            var request = endpointService.eventType({ name: "configuration/webhooks/messageTypes", method: "GET" }, $scope.webhook.eventType)
            request.then(function (promise) {
                if (promise && promise.err) alert(promise.err);
                else $scope.messageTypes = promise.data.response;
            })
        }
    })

    $scope.validateWebhook = function () {
        if ($scope.webhook.application == "") return false;
        else if ($scope.webhook.secret == "") return false;    
        else if ($scope.webhook.url == "") return false;    
        else if ($scope.webhook.eventType == undefined) return false;
        else if ($scope.webhook.messageType == undefined || $scope.webhook.messageType == "Please select an \"Event Type\" first.") return false;
        else return true;
    }

    $scope.saveWebhook = function () {
        var request = webhookService.createWebhook($scope.webhook);
        request.then(function (promise) {
            if (promise && promise.err) alert(err);
            else {
                alert("done");
                $scope.getCurrentWebhooks();
                $scope.webhook = {
                    application: "",
                    secret: "",
                    eventType: undefined,
                    messageType: undefined
                }
            }
        })
    }

    // ENTRY Point
    if ($scope.currentWebhooks == undefined) $scope.getCurrentWebhooks();
    if ($scope.eventTypes == undefined) getEventTypes();


    // webhook test


    $scope.timeout = 900;
    $scope.format = "mm:ss";
    var countdown;
    $scope.webhook = {
        register: {
            name: "Presence - Get Client Time Series",
            endpoint: "POST /beta/configuration/webhooks",
            description: "Creates a new Webhook subscription",
            status: 0,
            request: null,
            body: {},
            error: null,
            reponse: null,
            started: false,
            loaded: false,
            locationId: false
        },
        remove: {
            name: "Presence - Get Client Time Series",
            endpoint: "DELETE /beta/configuration/webhooks/{subscription}",
            description: "Deletes a Webhook subscription",
            status: 0,
            request: null,
            body: {},
            error: null,
            reponse: null,
            started: false,
            loaded: false,
            locationId: false
        },
        ready: false,
        response: null,
        success: null
    }

    $scope.start = function () {
        if (!$scope.webhook.ready) {
            if (requestWebhook) requestWebhook.abort();
            $scope.webhook.register.loaded = false;
            requestWebhook = webhookService.createWebhook();
            requestWebhook.then(function (promise) {
                if (promise) {
                    $scope.webhook.register.status = promise.status;
                    $scope.webhook.register.response = promise.data.response;
                    $scope.webhook.register.request = promise.data.request;
                    $scope.webhook.register.error = promise.data.error;
                    $scope.webhook.register.body = promise.data.body;
                    $scope.webhook.register.loaded = true;
                    if ($scope.webhook.register.status == 200) {
                        $scope.webhook.ready = true;
                        $scope.webhook.response = null;
                        $scope.webhook.success = null;
                        var wid = $scope.webhook.register.response.id;
                        socketio.emit("webhook", wid);
                        countdown = $interval(function () {
                            if ($scope.timeout > 0) $scope.timeout--;
                            else $scope.stop();
                        }, 1000);
                    }
                }
            });
        }
    }
    $scope.stop = function () {
        //if ($scope.webhook.ready) {
        $interval.cancel(countdown);
        if (requestWebhook) requestWebhook.abort();
        $scope.webhook.remove.loaded = false;
        requestWebhook = webhookService.deleteWebhook();
        requestWebhook.then(function (promise) {
            if (promise) {
                $scope.webhook.remove.status = promise.status;
                $scope.webhook.remove.response = promise.data.response;
                $scope.webhook.remove.request = promise.data.request;
                $scope.webhook.remove.error = promise.data.error;
                $scope.webhook.remove.body = promise.data.body;
                $scope.webhook.remove.loaded = true;
                if ($scope.webhook.remove.status == 200) $scope.webhook.ready = false;
            }
        });
        //}
    }

    $scope.showDetails = function (endpoint) {
        $mdDialog.show({
            controller: 'DialogDetailsController',
            templateUrl: 'modals/modalDetailsContent.html',
            locals: {
                items: endpoint
            }
        }).then(function () {
            getClassrooms();
        });
    };

    $scope.$on('$destroy', function () {
        // Make sure that the interval is destroyed too
        $scope.stop();
    });


    socketio.on('data', function (obj) {
        webhook.reponse = obj;

    });
    socketio.on('message', function (data) {
        console.log('Incoming message:', data);
    });


});