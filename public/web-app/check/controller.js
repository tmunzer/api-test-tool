angular.module('Check').controller("CheckCtrl", function ($scope, $mdDialog, queriesService) {
    var locationId;
    var requests = {
        configurationLocations: null,
        configurationSsids: null,
        identityCredentials: null,
        identityUserGroups: null,
        monitorClients: null,
        monitorDevices: null,
        presenceClientCount: null,
        presenceClientPresence: null,
        presenceClientTimeSeries: null
    }
   
    /**
     *
            locationClients: null,
                    locationClients: {
            key: "locationClients",
            name: "Location - Get Clients",
            endpoint: "GET /v1/location/clients{?ownerId,apMacs}",
            description: "Returns a list of current client location observations for each requested AP.",
            status: 0,
            data: null,
            isLoaded: true,
            locationId: false
        },
     */

    $scope.endpoints = {
        configurationLocations: {
            key: "configurationLocations",
            name: "Configuration - Get Locations",
            endpoint: "GET /v1/configuration/apLocationFolders{?ownerId}",
            description: "Exposes the Location Folder Hierarchy that a customer uses to associate non-geographic location information with an Access Point/Device.",
            status: 0,
            data: null,
            isLoaded: true,
            locationId: false
        },
        configurationSsids: {
            key: "configurationSsids",
            name: "Configuration - Get SSIDs",
            endpoint: "GET /beta/configuration/ssids{?ownerId}",
            description: "Provides information about the configured SSID Profiles",
            status: 0,
            data: null,
            isLoaded: true,
            locationId: false
        },
        identityCredentials: {
            key: "identityCredentials",
            name: "Identity - Get Credentials",
            endpoint: "GET /v1/identity/credentials{?credentialType,ownerId,memberOf,adUser,creator,loginName,firstName,lastName,phone,email,userGroup,page,pageSize}",
            description: "Allows one to query collection of credentials given query parameters as input",
            status: 0,
            data: null,
            isLoaded: true,
            locationId: false
        },
        identityUserGroups: {
            key: "identityUserGroups",
            name: "Identity - Get User Groups",
            endpoint: "GET /v1/identity/userGroups{?ownerId,memberOf,adUser}",
            description: "Allows one to query the collection of user groups given query parameters as input",
            status: 0,
            data: null,
            isLoaded: true,
            locationId: false
        },

        monitorClients: {
            key: "monitorClients",
            name: "Monitor - Get Clients",
            endpoint: "GET /v1/monitor/clients{?ownerId,startTime,endTime,page,pageSize}",
            description: "Returns a list of clients",
            status: 0,
            data: null,
            isLoaded: true,
            locationId: false
        },
        monitorDevices: {
            key: "monitorDevices",
            name: "Monitor - Get Devices",
            endpoint: "GET /v1/monitor/devices{?ownerId,showActiveClientCount,page,pageSize}",
            description: "Returns a list of devices",
            status: 0,
            data: null,
            isLoaded: true,
            locationId: false
        },
        presenceClientCount: {
            key: "presenceClientCount",
            name: "Presence - Get Clients Count",
            endpoint: "",
            description: "",
            status: 0,
            data: null,
            isLoaded: true,
            locationId: true
        },
        presenceClientPresence: {
            key: "presenceClientTimeSeries",
            name: "Presence - Get Clients Presence",
            endpoint: "",
            description: "",
            status: 0,
            data: null,
            isLoaded: true,
            locationId: true
        },
        presenceClientTimeSeries: {
            key: "presenceClientTimeSeries",
            name: "Presence - Get Client Time Series",
            endpoint: "",
            description: "",
            status: 0,
            data: null,
            isLoaded: true,
            locationId: true
        }
    }


    $scope.generateRequest = function (endpoint) {
        if (requests[endpoint]) requests[endpoint].abort();
        $scope.endpoints[endpoint].isLoaded = false;
        if ($scope.endpoints[endpoint].locationId == true) requests[endpoint] = queriesService[endpoint](locationId);
        else requests[endpoint] = queriesService[endpoint]();
        requests[endpoint].then(function (promise) {
            if (promise) {
                $scope.endpoints[endpoint].status = promise.status;
                $scope.endpoints[endpoint].data = promise.data;
                $scope.endpoints[endpoint].isLoaded = true;
                if (endpoint == "configurationLocations") setLocationId();
            }
        });
    }


    function setLocationId() {
        if ($scope.endpoints.configurationLocations.status == 200) {
            locationId = $scope.endpoints.configurationLocations.data.id;
            for (var endpoint in requests) {
                if ($scope.endpoints[endpoint].locationId == true) $scope.generateRequest(endpoint);
            }
        }
    }

    for (var endpoint in requests) {
        if ($scope.endpoints[endpoint].locationId == false) $scope.generateRequest(endpoint);
    }

$scope.showDetails = function(endpoint){
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
