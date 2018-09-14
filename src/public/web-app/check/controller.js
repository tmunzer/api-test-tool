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
                    description: "Provides a list of all supported Event Types available for subscription.",
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
            name: "Presence Analytics Endpoints",
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

    $scope.waitingForOtherCalls = function (endpoint) {
        if (endpoint.locationId && !locationId) return "locationId";
        else if (endpoint.deviceId && !deviceId) return "deviceId";
        else if (endpoint.clientId && !clientId) return "clientId";
        else if (endpoint.ssidProfileId && !ssidProfileId) return "ssidProfileId";
        else if (endpoint.apMacs && !apMacs) return "apMacs";
        else if (endpoint.eventType && !eventType) return "eventType";
        else return false;
    };

    $scope.apiCallSuccess = function (apiCall) {
        var done = 0;
        apiCall.endpoints.forEach(function (endpoint) {
            if (endpoint.response) done++;
        });
        return done;
    };
    $scope.apiCallError = function (apiCall) {
        var error = 0;
        apiCall.endpoints.forEach(function (endpoint) {
            if (endpoint.error) error++;
        });
        return error;
    };
    $scope.apiCallFinished = function (apiCall) {
        var finished = 0;
        apiCall.endpoints.forEach(function (endpoint) {
            if (endpoint.loaded) finished++;
        });
        return finished;
    };

    $scope.testApiCall = function (apiCall) {
        apiCall.endpoints.forEach(function (endpoint) {
            if (!$scope.waitingForOtherCalls(endpoint)) $scope.generateRequest(endpoint, true);
        });
    };

    $scope.testAllCategories = function () {
        initialized = true;
        for (var apiCall in $scope.apiCalls) {
            $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                if (!$scope.waitingForOtherCalls(endpoint)) $scope.generateRequest(endpoint, true);
            });
        }
    };

    $scope.generateRequest = function (endpoint, recursive) {
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
                if (endpoint.action == "locationId") setLocationId(endpoint.status, endpoint.response, recursive);
                else if (endpoint.action == "deviceId") setDeviceId(endpoint.status, endpoint.response, recursive);
                else if (endpoint.action == "clientId") setClientId(endpoint.status, endpoint.response, recursive);
                else if (endpoint.action == "ssidProfileId") setSsidProfileId(endpoint.status, endpoint.response, recursive);
                else if (endpoint.action == "apMacs") setApMacs(endpoint.status, endpoint.response, recursive);
                else if (endpoint.action == "eventType") setEventType(endpoint.status, endpoint.response, recursive);
            }
        });
    };


    function setLocationId(status, response, recursive) {
        if (status == 200) {
            locationId = response.id;
            if (recursive)
                for (var apiCall in $scope.apiCalls) {
                    $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                        if (endpoint.locationId == true && endpoint.started == false) $scope.generateRequest(endpoint);
                    });
                }
        }
    }
    function setDeviceId(status, response, recursive) {
        if (status == 200 && response.length > 0) {
            for (var i = 0; i <= response.length; i++) {
                if (response[i].simType == "REAL" && response[i].model.indexOf("AP") == 0) {
                    deviceId = response[i].deviceId;
                    i = response.length;
                }
                i++;
            }
            if (recursive)
                for (var apiCall in $scope.apiCalls) {
                    $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                        if (endpoint.deviceId == true && endpoint.started == false) $scope.generateRequest(endpoint);
                    });
                }
        }
    }
    function setClientId(status, response, recursive) {
        if (status == 200 && response.length > 0) {
            clientId = response[0].clientId;
            if (recursive)
                for (var apiCall in $scope.apiCalls) {
                    $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                        if (endpoint.clientId == true && endpoint.started == false) $scope.generateRequest(endpoint);
                    });
                }
        }
    }
    function setSsidProfileId(status, response, recursive) {
        if (status == 200 && response.length > 0) {
            var i = 0;
            while (ssidProfileId == undefined) {
                if (response[i].name != "ssid0") ssidProfileId = response[i].id;
                else i++;
            }

            if (recursive)
                for (var apiCall in $scope.apiCalls) {
                    $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                        if (endpoint.ssidProfileId == true && endpoint.started == false) $scope.generateRequest(endpoint);
                    });
                }
        }
    }
    function setApMacs(status, response, recursive) {
        if (status == 200) {
            apMacs = response.macAddress;
            if (recursive)
                for (var apiCall in $scope.apiCalls) {
                    $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                        if (endpoint.apMacs == true && endpoint.started == false) $scope.generateRequest(endpoint);
                    });
                }
        }
    }
    function setEventType(status, response, recursive) {
        if (status == 200) {
            eventType = response[0];
            if (recursive)
                for (var apiCall in $scope.apiCalls) {
                    $scope.apiCalls[apiCall].endpoints.forEach(function (endpoint) {
                        if (endpoint.eventType == true && endpoint.started == false) $scope.generateRequest(endpoint);
                    });
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

});


angular.module('Check').controller("WebhookCtrl", function ($scope, $rootScope, $location, $mdDialog, webhookService, endpointService, socketio) {
    var requestWebhook;

    // Registered webhooks    
    $scope.requestCurrentWebhook = undefined;
    $scope.webhookVersion = "v1";
    $scope.selectedCurrentWebhooks = [];
    $scope.currentWebhooks = undefined;
    $scope.query = {
        order: 'application',
        limit: 5,
        page: 1
    };

    //retrieve the list of registered webhooks
    $scope.getCurrentWebhooks = function () {
        if ($scope.requestCurrentWebhook) $scope.requestCurrentWebhook.abort();
        $scope.requestCurrentWebhook = webhookService.getCurrent($scope.webhookVersion);
        $scope.requestCurrentWebhook.then(function (promise) {

            if (promise && promise.error) $rootScope.$broadcast("apiError", promise.error);
            else if (promise.status > 300) $rootScope.$broadcast("apiError", promise.data.error);
            else {
                $scope.currentWebhooks = promise.data.response;
                $scope.webhook.test = undefined;
                $scope.currentWebhooks.forEach(function (webhook) {
                    if (webhook.application == "ApiTestTool" && 
                        webhook.ownerId == $rootScope.xapi.ownerId && 
                        webhook.secret == $rootScope.xapi.vpcUrl + $rootScope.xapi.ownerId && 
                        webhook.url == $location.protocol() + "://" + $location.host() + "/webhook/presence")
                        $scope.webhook.test = webhook;
                });
            }
        });
    };

    // remove one or many webhook registrations
    $scope.deleteCurrentWebhooks = function () {
        $scope.selectedCurrentWebhooks.forEach(function (toDelete) {
            var request = webhookService.deleteWebhook(toDelete, $scope.webhookVersion);
            request.then(function (promise) {
                if (promise) {
                    $scope.getCurrentWebhooks($scope.webhookVersion);
                }
            });
        });
    };

    // register new webhook
    $scope.eventTypes = undefined;
    $scope.messageTypes = ["Please select an \"Event Type\" first."];

    $scope.customWebhook = {
        application: "",
        secret: "",
        url: "",
        eventType: undefined,
        messageType: undefined
    };

    // retrieve the webhook eventType list
    function getEventTypes() {
        var request = endpointService.noId({ name: "configuration/webhooks/eventTypes", method: "GET" });
        request.then(function (promise) {
            if (promise && promise.err) $rootScope.$broadcast("apiError", promise.err);
            else if (promise.status > 300) $rootScope.$broadcast("apiError", promise.data.error);
            else $scope.eventTypes = promise.data.response;
        });
    }

    // retrieve the webhook messageTypes list each time the eventType value is changing
    $scope.$watch("customWebhook.eventType", function () {
        if ($scope.customWebhook.eventType != undefined) {
            var request = endpointService.eventType({ name: "configuration/webhooks/messageTypes", method: "GET" }, $scope.customWebhook.eventType);
            request.then(function (promise) {
                if (promise && promise.err) $rootScope.$broadcast("apiError", promise.err);
                else if (promise.status > 300) $rootScope.$broadcast("apiError", promise.data.error);
                else $scope.messageTypes = promise.data.response;
            });
        }
    });

    // validate the form values
    $scope.validateWebhook = function () {
        if ($scope.customWebhook.application == "") return false;
        else if ($scope.customWebhook.secret == "") return false;
        else if ($scope.customWebhook.url == "") return false;
        //else if ($scope.customWebhook.eventType == undefined) return false;
        //else if ($scope.customWebhook.messageType == undefined || $scope.customWebhook.messageType == "Please select an \"Event Type\" first.") return false;
        else return true;
    };

    // register a new webhook endpoint
    $scope.saveCustomWebhook = function () {
        var request = webhookService.createWebhook($scope.customWebhook, $scope.webhookVersion);
        request.then(function (promise) {
            if (promise && promise.err) alert(err);
            else {
                alert("done");
                $scope.getCurrentWebhooks($scope.webhookVersion);
                $scope.customWebhook = {
                    application: "",
                    secret : "",
                    url : "",
                    eventType : undefined,
                    messageType : undefined,
                };
            }
        });
    };

    // ENTRY Point
    if ($scope.currentWebhooks == undefined) $scope.getCurrentWebhooks($scope.webhookVersion);
    // ONLY REQUIRED FOR BETA? 
    // if ($scope.eventTypes == undefined) getEventTypes();


    // webhook test


    $scope.webhook = {
        register: {
            name: "Presence - Get Client Time Series",
            endpoint: "POST /v1/configuration/webhooks",
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
            endpoint: "DELETE /v1/configuration/webhooks/{subscription}",
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
        test: undefined,
        started: false,
        socket: false,
        response: [],
        success: null
    };
    $scope.displayedResponse = -1;

    // change the webhook data to display
    $scope.showResponse = function (index) {
        if ($scope.displayedResponse == index) $scope.displayedResponse = -1;
        else $scope.displayedResponse = index;
    };
    // manage the webhook data to display/hide
    $scope.isDisplayed = function (index) {
        return $scope.displayedResponse == index;
    };

    //start the test
    $scope.startWh = function () {
        // indicate to the UI that the starting process is initiated        
        $scope.webhook.register.started = true;
        // start the process
        if (requestWebhook) requestWebhook.abort();
        $scope.webhook.register.loaded = false;
        requestWebhook = webhookService.createWebhook();
        requestWebhook.then(function (promise) {
            if (promise) {
                // once the response from the server is received, send a "start" message into the socket to inform everyone
                socketio.emit("update", "start");
                //retrieve the response data
                $scope.webhook.register.status = promise.status;
                $scope.webhook.register.response = promise.data.response;
                $scope.webhook.register.request = promise.data.request;
                $scope.webhook.register.error = promise.data.error;
                $scope.webhook.register.body = promise.data.body;
                $scope.webhook.register.loaded = true;
                if ($scope.webhook.register.status == 200) {
                    $scope.webhook.started = true;
                    $scope.webhook.response = [];
                    $scope.webhook.success = null;
                    $scope.webhook.test = $scope.webhook.register.response;
                }
            }
        });
    };

    // stop the test
    $scope.stopWh = function () {
        var webhookId;
        // try to get the webhook id from the local data
        if ($scope.webhook.test) webhookId = $scope.webhook.test.id;
        // indicates to the UI that the stop process is started
        $scope.webhook.remove.started = true;
        // starts the stop process
        if (requestWebhook) requestWebhook.abort();
        $scope.webhook.remove.loaded = false;
        requestWebhook = webhookService.deleteWebhook(webhookId);
        requestWebhook.then(function (promise) {
            if (promise) {
                // once the response from the server is received, send a "stop" message into the socket to inform everyone
                socketio.emit("update", "stop");
                //retrieve the response data
                $scope.webhook.remove.status = promise.status;
                $scope.webhook.remove.response = promise.data.response;
                $scope.webhook.remove.request = promise.data.request;
                $scope.webhook.remove.error = promise.data.error;
                $scope.webhook.remove.body = promise.data.body;
                $scope.webhook.remove.loaded = true;
                if ($scope.webhook.remove.status == 200) $scope.webhook.started = false;
            }
        });
    };

    // manage the modal to display the webhook endpoints details
    $scope.showDetails = function (endpoint) {
        $mdDialog.show({
            controller: 'DialogDetailsController',
            templateUrl: 'modals/modalDetailsContent.html',
            locals: {
                items: endpoint
            }
        });
    };

    // 
    $scope.$watch("webhookVersion", function(){
        $scope.getCurrentWebhooks();
    });
    $scope.$watch("webhook.test", function (newValue, oldValue) {
        if ($scope.webhook.test == undefined && $scope.webhook.socket == true) {
            $scope.webhook.socket = false;
        }
        else if ($scope.webhook.test != undefined && $scope.webhook.socket == false) {
            $scope.webhook.socket = true;
            var wid = $scope.webhook.test.id;
            socketio.emit("webhook", wid);
        }
    });

    // receive webhook test data
    socketio.on('data', function (obj) {
        $scope.webhook.response.push(obj);
    });

    // debug logs to check the socket connection
    socketio.on('message', function (data) {
        console.log('Incoming message:', data);
    });

    // update the list of registerd webhooks when someone with the same ownerId starts the test
    socketio.on("update", function (data) {
        $scope.getCurrentWebhooks();
    });

});