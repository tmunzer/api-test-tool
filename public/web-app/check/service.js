angular.module('Check').factory("endpointService", function ($http, $q) {
    var dataLoaded = {
        configurationLocations: false,
        configurationSsids: false,
        configurationWebhooks: false,
        identityCredentials: false,
        identityUserGroups: false,
        locationClients: false,
        monitorClients: false,
        monitorDevices: false,
        presenceClientCount: false,
        presenceClientPresence: false,
        presenceClientTimeSeries: false,
    }


    function configurationLocations() {
        dataLoaded.configurationLocations = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/configuration/locations",
            method: "GET",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function configurationSsids() {
        dataLoaded.configurationSsids = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/configuration/ssids",
            method: "GET",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function configurationWebhooks(){
        dataLoaded.configurationWebhooks = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/configuration/webhooks",
            method: "GET",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function identityCredentials() {
        dataLoaded.identityCredentials = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/identity/credentials",
            method: "GET",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function identityUserGroups() {
        dataLoaded.identityUserGroups = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/identity/userGroups",
            method: "GET",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function locationClients() {
        dataLoaded.locationClients = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/location/clients",
            method: "GET",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function monitorClients() {
        dataLoaded.monitorClients = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/monitor/clients",
            method: "GET",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function monitorDevices() {
        dataLoaded.monitorDevices = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/monitor/devices",
            method: "GET",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function presenceClientCount(locationId) {
        dataLoaded.presenceClientCount = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/presence/clientcount",
            method: "GET",
            params: {locationId: locationId},
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function presenceClientPresence(locationId) {
        dataLoaded.presenceClientPresence = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/presence/clientpresence",
            method: "GET",
            params: {'locationId': locationId},
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function presenceClientTimeSeries(locationId) {
        dataLoaded.presenceClientTimeSeries = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/presence/clienttimeseries",
            method: "GET",
            params: {locationId: locationId},
            timeout: canceller.promise
        });
        return httpRequest(request);
    }

    function httpRequest(request) {
        var promise = request.then(
            function (response) {
                return response;
            },
            function (response) {
                if (response.status && response.status >= 0) {
                    return response;
                }
            });

        promise.abort = function () {
            canceller.resolve();
        };
        promise.finally(function () {
            console.info("Cleaning up object references.");
            promise.abort = angular.noop;
            canceller = request = promise = null;
        });

        return promise;

    }


    return {
        configurationLocations: configurationLocations,
        configurationSsids: configurationSsids,
        configurationWebhooks: configurationWebhooks,
        identityCredentials: identityCredentials,
        identityUserGroups: identityUserGroups,
        locationClients: locationClients,
        monitorClients: monitorClients,
        monitorDevices: monitorDevices,
        presenceClientCount: presenceClientCount,
        presenceClientPresence: presenceClientPresence,
        presenceClientTimeSeries: presenceClientTimeSeries,
        isLoaded: function(endpoint) {
            return isLoaded[endpoint];
        }
    }
});

angular.module('Check').factory("webhookService", function ($http, $q) {


    function createWebhook() {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/configuration/webhooks/",
            method: "POST",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }

    function deleteWebhook() {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/configuration/webhooks/",
            method: "DELETE",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }

    
    function httpRequest(request) {
        var promise = request.then(
            function (response) {
                return response;
            },
            function (response) {
                if (response.status && response.status >= 0) {
                    return response;
                }
            });

        promise.abort = function () {
            canceller.resolve();
        };
        promise.finally(function () {
            console.info("Cleaning up object references.");
            promise.abort = angular.noop;
            canceller = request = promise = null;
        });

        return promise;

    }


    return {
        createWebhook: createWebhook,
        deleteWebhook: deleteWebhook
    }
});
