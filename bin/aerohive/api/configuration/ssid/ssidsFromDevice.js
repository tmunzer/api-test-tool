var api = require("./../../req");

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
module.exports.GET = function (xapi, devAccount,  deviceId,callback) {
    var path = "/beta/configuration/devices/" + deviceId + "/ssids?ownerId=" + xapi.ownerId;
    api.GET(xapi, devAccount, path, callback);
};
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
module.exports.PUT = function (xapi, devAccount,  deviceId, changes,callback) {
    var path = "/beta/configuration/devices/" + deviceId + "/ssids?ownerId=" + xapi.ownerID;
    api.PUT(xapi,devAccount,  path, changes,  callback);
};