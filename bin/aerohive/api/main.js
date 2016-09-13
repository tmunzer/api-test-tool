module.exports.configuration = {
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

    ssids: {
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
        get: require("./configuration/ssid/retrieveSsids").GET
    },


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

module.exports.monitor = {
    devices: {
        list: require("./monitor/device").GET
    },
    clients: {
        list: require("./monitor/client").clientsList,
        details: require("./monitor/client").clientDetails
    }
};

module.exports.clientlocation = {
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
    clientpresence: require("./presence/clientlocation").clientpresence

};

module.exports.identity = {
    userGroups: {
        getUserGroups: require("./identity/userGroups").getUserGroups
    },
    credentials: {
        getCredentials: require("./identity/credentials").getCredentials,
        createCredential: require("./identity/credentials").createCredential,
        deleteCredential: require("./identity/credentials").deleteCredential,
        deliverCredential: require("./identity/credentials").deliverCredential,
        renewCredential: require("./identity/credentials").renewCredential,
        updateCredential: require("./identity/credentials").updateCredential
    }
};