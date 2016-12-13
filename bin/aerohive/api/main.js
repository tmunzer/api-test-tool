module.exports.configuration = {

    /* ========================================================
    configuration-device-location : Device Location Endpoints
    ======================================================== */
    locations: {
        /**
         * Exposes the Location Folder Hierarchy that a customer uses to associate non-geographic location information with an Access Point/Device.
         * @param {Object} xapi - API credentials
         * @param {String} xapi.vpcUrl - ACS server to request
         * @param {String} xapi.ownerId - ACS ownerId
         * @param {String} xapi.accessToken - ACS accessToken
         * @param {Object} devAccount - information about the Aerohive developper account to user
         * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
         * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
         * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
         *  */
        locations: require("./configuration/location").locations,

        /**
        * Allows one to retrieve a Location Folder node anywhere within the hierarchy.
        * @param {Object} xapi - API credentials
        * @param {String} xapi.vpcUrl - ACS server to request
        * @param {String} xapi.ownerId - ACS ownerId
        * @param {String} xapi.accessToken - ACS accessToken
        * @param {Object} devAccount - information about the Aerohive developper account to user
        * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
        * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
        * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
        * @param {String} folderId - The id of the desired Location folder
        *  */
        location: require("./configuration/location").location,
    },



    /* ======================================================================
    configuration-ssid : Configuration Endpoints for SSID related operations.
    ====================================================================== */
    ssids: {
        /**
        * Retrieves SSID related configuration information for the specified device.
        * @param {Object} xapi - API credentials
        * @param {String} xapi.vpcUrl - ACS server to request
        * @param {String} xapi.ownerId - ACS ownerId
        * @param {String} xapi.accessToken - ACS accessToken
        * @param {Object} devAccount - information about the Aerohive developper account to user
        * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
        * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
        * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
        * @param {String} deviceId - The Id of the desired device
        *  */
        ssidForDevice: require("./configuration/ssid").ssidForDevice,
        /**
         * Provides information about the configured Pre-shared Key or Private Pre-shared Key for the specified SSID.
         * @param {Object} xapi - API credentials
         * @param {String} xapi.vpcUrl - ACS server to request
         * @param {String} xapi.ownerId - ACS ownerId
         * @param {String} xapi.accessToken - ACS accessToken
         * @param {Object} devAccount - information about the Aerohive developper account to user
         * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
         * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
         * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
         * @param {String} ssidProfileId - The ID of the desired SSID
         *  */
        pskForSsid: require("./configuration/ssid").pskForSsid,
        /**
         * Provides information about the configured SSID Profiles
         * @param {Object} xapi - API credentials
         * @param {String} xapi.vpcUrl - ACS server to request
         * @param {String} xapi.ownerId - ACS ownerId
         * @param {String} xapi.accessToken - ACS accessToken
         * @param {Object} devAccount - information about the Aerohive developper account to user
         * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
         * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
         * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
         *  */
        ssidProfiles: require("./configuration/ssid").ssidProfiles,
        /**
         * Updates the SSID Configuration for the specified device.
         * @param {Object} xapi - API credentials
         * @param {String} xapi.vpcUrl - ACS server to request
         * @param {String} xapi.ownerId - ACS ownerId
         * @param {String} xapi.accessToken - ACS accessToken
         * @param {Object} devAccount - information about the Aerohive developper account to user
         * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
         * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
         * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
         * @param {String} deviceId - The Id of the desired device
         * @param {Object} changes - The changes to be applied to the SSID Configuration for the specified device.
         *  */
        updateSsid: require("./configuration/ssid").updateSsid,
        /**
         * Updates information about the configured Pre-shared Key or Private Pre-shared Key for the specified SSID.
         * @param {Object} xapi - API credentials
         * @param {String} xapi.vpcUrl - ACS server to request
         * @param {String} xapi.ownerId - ACS ownerId
         * @param {String} xapi.accessToken - ACS accessToken
         * @param {Object} devAccount - information about the Aerohive developper account to user
         * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
         * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
         * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
         * @param {String} ssidProfileId - The ID of the desired SSID
         * @param {Object} changes - The PSK or PPSK configuration changes to be applied to this SSID and network policy.
         *  */
        updatePsk: require("./configuration/ssid").updatePsk
    },


    /* ======================================================================
    configuration-ssid : Configuration Endpoints for SSID related operations.
    ====================================================================== */
    ssidFilters: {
        /**
         * Get the Filtering Rules for the given SSID Profile ID
         * @param {Object} xapi - API credentials
         * @param {String} xapi.vpcUrl - ACS server to request
         * @param {String} xapi.ownerId - ACS ownerId
         * @param {String} xapi.accessToken - ACS accessToken
         * @param {Object} devAccount - information about the Aerohive developper account to user
         * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
         * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
         * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
         * @param {String} ssidProfileId - The ID of the SSID Profile
         *  */
        ssidForDevice: require("./configuration/ssid-profile").ssidForDevice,
        /**
         * Updates the SSID Configuration for the specified device.
         * @param {Object} xapi - API credentials
         * @param {String} xapi.vpcUrl - ACS server to request
         * @param {String} xapi.ownerId - ACS ownerId
         * @param {String} xapi.accessToken - ACS accessToken
         * @param {Object} devAccount - information about the Aerohive developper account to user
         * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
         * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
         * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
         * @param {String} ssidProfileId - The ID of the SSID Profile
         * @param {Object} changes - The full list of all Filtering rule applied to this SSID Profile.
         * @param {Boolean=} changes.enableMacFilters - Whether MAC filtering rules should be applied for this SSID
         * @param {String=} changes.macFilterDefaultAction - filtering rule that affects all traffic on the SSID = ['PERMIT', 'DENY']
         * @param {ArrayOfObjects=} changes.rules - MAC filtering rules that only apply to specific clients on the SSID
         * @param {String=} changes.rules[].action - Whether to permit or deny the Mac object = ['PERMIT', 'DENY']
         * @param {String=} changes.rules[].type - The type of MAC Filter object as defined by MacFilterType values = ['MAC_ADDRESS', 'MAC_OUI']
         * @param {String=} changes.rules[].value - The value of this MAC Filter object as defined by the type
         *  */
        updateSsid: require("./configuration/ssid-profile").updateSsid
    },


    /* ======================================================================
    configuration-webhooks : Configuration Endpoints for Webhook Subscriptions
    ====================================================================== */
    webhooks: {
        /**
     * Provides access to the list of current Webhook subscriptions.
     * @param {Object} xapi - API credentials
     * @param {String} xapi.vpcUrl - ACS server to request
     * @param {String} xapi.ownerId - ACS ownerId
     * @param {String} xapi.accessToken - ACS accessToken
     * @param {Object} devAccount - information about the Aerohive developper account to user
     * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
     * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
     * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
     *  */
        get: require("./configuration/webhooks").get,
        /**
     * Creates a new Webhook subscription
     * @param {Object} xapi - API credentials
     * @param {String} xapi.vpcUrl - ACS server to request
     * @param {String} xapi.ownerId - ACS ownerId
     * @param {String} xapi.accessToken - ACS accessToken
     * @param {Object} devAccount - information about the Aerohive developper account to user
     * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
     * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
     * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
     * @param {Object} subscription - The subscription parameters
     * @param {String} subscription.application - The application name that receives a callback as a result of the subscription.
     * @param {String} subscription.ownerId - The id of the customer that owns this device.
     * @param {String} subscription.secret - The shared secret sent to the subscribing application. 
     * @param {String} subscription.url - The https URL to receive a callback as a result of the subscription
     *  */
        create: require("./configuration/webhooks").create,
        /**
     * Deletes Webhook subscription
     * @param {Object} xapi - API credentials
     * @param {String} xapi.vpcUrl - ACS server to request
     * @param {String} xapi.ownerId - ACS ownerId
     * @param {String} xapi.accessToken - ACS accessToken
     * @param {Object} devAccount - information about the Aerohive developper account to user
     * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
     * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
     * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
     * @param {String} subscriptionId - The subscription parameters
     *  */
        remove: require("./configuration/webhooks").remove,
    }
};

module.exports.location = {

    /**
     * Allows one to query the collection of user groups given query parameters as input
     * @param {Object} xapi - API credentials
     * @param {String} xapi.vpcUrl - ACS server to request
     * @param {String} xapi.ownerId - ACS ownerId
     * @param {String} xapi.accessToken - ACS accessToken
     * @param {Object} devAccount - information about the Aerohive developper account to user
     * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
     * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
     * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
     * @param {Array} apMacs - A comma seperated list of AP Mac Addresses.
     *  */
    clients: require("./location/realtime").clients

}

module.exports.identity = {
    /* ======================================================================
    identity-management-user-groups : User Group Management Endpoints
    ====================================================================== */
    userGroups: {
        getUserGroups: require("./identity/userGroups").getUserGroups
    },
    /* ======================================================================
    identity-management-credentials : Credential Management Endpoints
    ====================================================================== */
    credentials: {
        getCredentials: require("./identity/credentials").getCredentials,
        createCredential: require("./identity/credentials").createCredential,
        deleteCredential: require("./identity/credentials").deleteCredential,
        deliverCredential: require("./identity/credentials").deliverCredential,
        renewCredential: require("./identity/credentials").renewCredential,
        updateCredential: require("./identity/credentials").updateCredential
    }
};

module.exports.monitor = {
    /* ======================================================================
    monitoring-devices : Device Monitoring Endpoints
    ====================================================================== */
    devices: {
        devices: require("./monitor/device").devices,
        device: require("./monitor/device").device
    },
    /* ======================================================================
    monitoring-client-devices : Monitoring Endpoints for Client Devices Connected to Aerohive Devices
    ====================================================================== */
    clients: {
        clients: require("./monitor/client").clients,
        client: require("./monitor/client").client
    }
};

/* ======================================================================
monitoring-client-devices : Monitoring Endpoints for Client Devices Connected to Aerohive Devices
====================================================================== */
module.exports.clientlocation = {
    /**
* Returns a count of the number of clients seen during the specified time period with a timeUnit of OneHour.
* @param {Object} xapi - API credentials
* @param {String} xapi.vpcUrl - ACS server to request
* @param {String} xapi.ownerId - ACS ownerId
* @param {String} xapi.accessToken - ACS accessToken
* @param {Object} devAccount - information about the Aerohive developper account to user
* @param {String} devAccount.clientID - Aerohive Developper Account ClientID
* @param {String} devAccount.clientSecret - Aerohive Developper Account secret
* @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
* @param {String} location - The location that you'd like to check against.
* @param {String} startTime - The start time of the query (ISO-8601 format).
* @param {String} endTime - The end time of the query (ISO-8601 format) 
*  */
    clientcount: require("./presence/clientlocation").clientcount,

    /**
* Returns a list of distinct clients during the specified time period broken down by the specified time unit.
* @param {Object} xapi - API credentials
* @param {String} xapi.vpcUrl - ACS server to request
* @param {String} xapi.ownerId - ACS ownerId
* @param {String} xapi.accessToken - ACS accessToken
* @param {Object} devAccount - information about the Aerohive developper account to user
* @param {String} devAccount.clientID - Aerohive Developper Account ClientID
* @param {String} devAccount.clientSecret - Aerohive Developper Account secret
* @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
* @param {String} location - The location that you'd like to check against.
* @param {String} startTime - The start time of the query (ISO-8601 format).
* @param {String} endTime - The end time of the query (ISO-8601 format)
* @param {String} timeUnit - The time unit by which you want to roll up the returned items.
*  */
    clientpresence: require("./presence/clientlocation").clientpresence,

    /**
     * Returns a list of client sessions and waypoints during the specified time period
     * @param {Object} xapi - API credentials
     * @param {String} xapi.vpcUrl - ACS server to request
     * @param {String} xapi.ownerId - ACS ownerId
     * @param {String} xapi.accessToken - ACS accessToken
     * @param {Object} devAccount - information about the Aerohive developper account to user
     * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
     * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
     * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
     * @param {String} location - The location that you'd like to check against.
     * @param {Boolean} waypoints - Should waypoints be shown
     * @param {String} startTime - The start time of the query (ISO-8601 format).
     * @param {String} endTime - The end time of the query (ISO-8601 format)
     *  */
    clientsessions: require("./presence/clientlocation").clientsessions,

    /**
* Returns a list of distinct clients during the specified time period broken down by the specified time unit.
* @param {Object} xapi - API credentials
* @param {String} xapi.vpcUrl - ACS server to request
* @param {String} xapi.ownerId - ACS ownerId
* @param {String} xapi.accessToken - ACS accessToken
* @param {Object} devAccount - information about the Aerohive developper account to user
* @param {String} devAccount.clientID - Aerohive Developper Account ClientID
* @param {String} devAccount.clientSecret - Aerohive Developper Account secret
* @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
* @param {String} location - The location that you'd like to check against.
* @param {String} startTime - The start time of the query (ISO-8601 format).
* @param {String} endTime - The end time of the query (ISO-8601 format)
* @param {String} timeUnit - The time unit by which you want to roll up the returned items.
*  */
    clienttimeseries: require("./presence/clientlocation").clienttimeseries,

    /**
     * Returns a list of client sessions and waypoints during the specified time period.
     * @param {Object} xapi - API credentials
     * @param {String} xapi.vpcUrl - ACS server to request
     * @param {String} xapi.ownerId - ACS ownerId
     * @param {String} xapi.accessToken - ACS accessToken
     * @param {Object} devAccount - information about the Aerohive developper account to user
     * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
     * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
     * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
     * @param {String} location - The location that you'd like to check against.
     * @param {String} startTime - The start time of the query (ISO-8601 format).
     * @param {String} endTime - The end time of the query (ISO-8601 format)
     *  */
    waypoints: require("./presence/clientlocation").waypoints
};

