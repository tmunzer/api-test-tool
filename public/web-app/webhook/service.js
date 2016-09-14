angular.module('Check').factory("queriesService", function ($http, $q) {


    function createWebhook() {
        dataLoaded.configurationLocations = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/configuration/webhooks",
            method: "POST",
            timeout: canceller.promise
        });
        return httpRequest(request);
    }

    function deleteWebhook() {
        dataLoaded.configurationLocations = false;
        var canceller = $q.defer();
        var request = $http({
            url: "/api/configuration/webhooks",
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
        configurationLocations: configurationLocations,
        configurationSsids: configurationSsids,
        configurationWebhooks: configurationWebhooks,
        isLoaded: function(endpoint) {
            return isLoaded[endpoint];
        }
    }
});
