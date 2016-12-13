angular.module('Check').factory("endpointService", function ($http, $q) {

    function noId(endpoint) {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/" + endpoint.name,
            method: endpoint.method,
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function locationId(endpoint, locationId) {        
        var canceller = $q.defer();
        var request = $http({
            url: "/api/" + endpoint.name,
            method: endpoint.method,
            params: { 'locationId': locationId },
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function deviceId(endpoint, deviceId) {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/" + endpoint.name,
            method: endpoint.method,
            params: { 'deviceId': deviceId },
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function clientId(endpoint, clientId) {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/" + endpoint.name,
            method: endpoint.method,
            params: { 'clientId': clientId },
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function ssidProfile(endpoint, ssidProfile) {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/" + endpoint.name,
            method: endpoint.method,
            params: { 'ssidProfile': ssidProfile },
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function noId(endpoint, locationId) {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/" + endpoint.name,
            method: endpoint.method,
            params: { 'locationId': locationId },
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
        noId: noId,
        locationId: locationId,
        deviceId: deviceId,
        clientId: clientId
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
