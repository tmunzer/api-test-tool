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
    function ssidProfileId(endpoint, ssidProfileId) {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/" + endpoint.name,
            method: endpoint.method,
            params: { 'ssidProfileId': ssidProfileId },
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function apMacs(endpoint, apMacs) {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/" + endpoint.name,
            method: endpoint.method,
            params: { 'apMacs': apMacs },
            timeout: canceller.promise
        });
        return httpRequest(request);
    }
    function eventType(endpoint, eventType) {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/" + endpoint.name,
            method: endpoint.method,
            params: { 'eventType': eventType },
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
        clientId: clientId,
        ssidProfileId: ssidProfileId,
        apMacs: apMacs,
        eventType: eventType
    }
});

angular.module('Check').factory("webhookService", function ($http, $q) {

    function createWebhook(webhook) {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/configuration/webhooks/",
            method: "POST",
            data: { webhook: webhook },
            timeout: canceller.promise
        });
        return httpRequest(request);
    }

    function deleteWebhook(webhookId) {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/configuration/webhooks/",
            method: "DELETE",
            params: { webhookId: webhookId },
            timeout: canceller.promise
        });
        return httpRequest(request);
    }

    function getCurrent() {
        var canceller = $q.defer();
        var request = $http({
            url: "/api/configuration/webhooks/",
            method: "GET",
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
        deleteWebhook: deleteWebhook,
        getCurrent: getCurrent,
    }
});
