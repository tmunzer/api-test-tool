angular.module('Check').controller("CheckCtrl", function ($scope, $mdDialog, endpointService) {
});
angular.module('Check').controller("EndpointCtrl", function ($scope, $mdDialog, endpointService) {
    var locationId;
    var requests = {
        configurationLocations: null,
        configurationSsids: null,
        configurationWebhooks: null,
        identityCredentials: null,
        identityUserGroups: null,
        monitorClients: null,
        monitorDevices: null,
        presenceClientCount: null,
        presenceClientPresence: null,
        presenceClientTimeSeries: null,
        presenceWaypoints: null
    };


    $scope.endpoints = {
        configurationLocations: {
            key: "configurationLocations",
            name: "Configuration - Get Locations",
            endpoint: "GET /v1/configuration/apLocationFolders{?ownerId}",
            description: "Exposes the Location Folder Hierarchy that a customer uses to associate non-geographic location information with an Access Point/Device.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: false
        },
        configurationSsids: {
            key: "configurationSsids",
            name: "Configuration - Get SSIDs",
            endpoint: "GET /beta/configuration/ssids{?ownerId}",
            description: "Provides information about the configured SSID Profiles.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: false
        },
        configurationWebhooks: {
            key: "configurationWebhooks",
            name: "Configuration - Get Webhooks",
            endpoint: "GET /beta/configuration/webhooks{?ownerId}",
            description: "Provides access to the list of current Webhook subscriptions.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: false
        },
        identityCredentials: {
            key: "identityCredentials",
            name: "Identity - Get Credentials",
            endpoint: "GET /v1/identity/credentials{?credentialType,ownerId,memberOf,adUser,creator,loginName,firstName,lastName,phone,email,userGroup,page,pageSize}",
            description: "Allows one to query collection of credentials given query parameters as input.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: false
        },
        identityUserGroups: {
            key: "identityUserGroups",
            name: "Identity - Get User Groups",
            endpoint: "GET /v1/identity/userGroups{?ownerId,memberOf,adUser}",
            description: "Allows one to query the collection of user groups given query parameters as input.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: false
        },

        monitorClients: {
            key: "monitorClients",
            name: "Monitor - Get Clients",
            endpoint: "GET /v1/monitor/clients{?ownerId,startTime,endTime,page,pageSize}",
            description: "Returns a list of clients.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: false
        },
        monitorDevices: {
            key: "monitorDevices",
            name: "Monitor - Get Devices",
            endpoint: "GET /v1/monitor/devices{?ownerId,showActiveClientCount,page,pageSize}",
            description: "Returns a list of devices.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: false
        },
        presenceClientCount: {
            key: "presenceClientCount",
            name: "Presence - Get Clients Count",
            endpoint: "GET /v1/clientlocation/clientcount{?ownerId,apmac,location,startTime,endTime}",
            description: "Returns a count of the number of clients seen during the specified time period with a timeUnit of OneHour.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: true
        },
        presenceClientPresence: {
            key: "presenceClientPresence",
            name: "Presence - Get Clients Presence",
            endpoint: "GET /v1/clientlocation/clientpresence{?ownerId,apmac,location,timeUnit,startTime,endTime}",
            description: "Returns a list of distinct clients during the specified time period broken down by the specified time unit.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: true
        },
        presenceClientTimeSeries: {
            key: "presenceClientTimeSeries",
            name: "Presence - Get Client Time Series",
            endpoint: "GET /v1/clientlocation/clienttimeseries{?ownerId,apmac,location,timeUnit,startTime,endTime}",
            description: "Returns a count of the number of clients seen during the specified time period broken down by the specified time unit.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: true
        },
        presenceWaypoints: {
            key: "presenceWaypoints",
            name: "Presence - Get Client Sessions and Waypoints",
            endpoint: "GET /v1/clientlocation/waypoints{?ownerId,location,startTime,endTime}",
            description: "Returns a list of client sessions and waypoints during the specified time period.",
            status: 0,
            request: null,
            body: {},
            reponse: null,
            error: null,
            isLoaded: true,
            locationId: true
        }
    };


    $scope.generateRequest = function (endpoint) {
        if (requests[endpoint]) requests[endpoint].abort();
        $scope.endpoints[endpoint].isLoaded = false;
        if ($scope.endpoints[endpoint].locationId == true) requests[endpoint] = endpointService[endpoint](locationId);
        else requests[endpoint] = endpointService[endpoint]();
        requests[endpoint].then(function (promise) {
            if (promise) {
                $scope.endpoints[endpoint].status = promise.status;
                $scope.endpoints[endpoint].response = promise.data.response;
                $scope.endpoints[endpoint].error = promise.data.error;
                $scope.endpoints[endpoint].request = promise.data.request;
                $scope.endpoints[endpoint].body = promise.data.body;
                $scope.endpoints[endpoint].isLoaded = true;
                if (endpoint == "configurationLocations") setLocationId();
            }
        });
    }


    function setLocationId() {
        if ($scope.endpoints.configurationLocations.status == 200) {
            locationId = $scope.endpoints.configurationLocations.response.id;
            for (var endpoint in requests) {
                if ($scope.endpoints[endpoint].locationId == true) $scope.generateRequest(endpoint);
            }
        }
    }

    for (var endpoint in requests) {
        if ($scope.endpoints[endpoint].locationId == false) $scope.generateRequest(endpoint);
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

});


angular.module('Check').controller("WebhookCtrl", function ($scope, $mdDialog, $interval, webhookService, socketio) {
    var requestWebhook;
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
            isLoaded: true,
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
            isLoaded: true,
            locationId: false
        },
        ready: false,
        response: null,
        success: null
    }

    $scope.start = function () {
        if (!$scope.webhook.ready) {
            if (requestWebhook) requestWebhook.abort();
            $scope.webhook.register.isLoaded = false;
            requestWebhook = webhookService.createWebhook();
            requestWebhook.then(function (promise) {
                if (promise) {
                    $scope.webhook.register.status = promise.status;
                    $scope.webhook.register.response = promise.data.response;
                    $scope.webhook.register.request = promise.data.request;
                    $scope.webhook.register.error = promise.data.error;
                    $scope.webhook.register.body = promise.data.body;
                    $scope.webhook.register.isLoaded = true;
                    if ($scope.webhook.register.status == 200) {
                        $scope.webhook.ready = true;
                        $scope.webhook.response = null;
                        $scope.webhook.success = null;
                        console.log($scope.webhook.register.response);
                        var wid = $scope.webhook.register.response.id;
                        console.log(wid);
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
        if ($scope.webhook.ready) {
            $interval.cancel(countdown);
            if (requestWebhook) requestWebhook.abort();
            $scope.webhook.remove.isLoaded = false;
            requestWebhook = webhookService.deleteWebhook();
            requestWebhook.then(function (promise) {
                if (promise) {
                    $scope.webhook.remove.status = promise.status;
                    $scope.webhook.remove.response = promise.data.response;
                    $scope.webhook.remove.request = promise.data.request;
                    $scope.webhook.remove.error = promise.data.error;
                    $scope.webhook.remove.body = promise.data.body;
                    $scope.webhook.remove.isLoaded = true;
                    if ($scope.webhook.remove.status == 200) $scope.webhook.ready = false;
                }
            });
        }
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
        console.log("reponse", obj);
        webhook.reponse = obj;

    });
    socketio.on('message', function (data) {
        console.log('Incoming message:', data);
    });
});