
var KeyVault = require('azure-keyvault');
var AuthenticationContext = require('adal-node').AuthenticationContext;

var clientId = "0000000";
var clientSecret = "xxxxxx";
var vaultUri = "https://nomekeyvault.vault.azure.net/";

var authenticator = function(challenge, callback) {
    var context = new AuthenticationContext(challenge.authorization);
	
    return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, function(err, tokenResponse) {
        if (err) throw err;

        var authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;

        return callback(null, authorizationValue);
    });

};

var credentials = new KeyVault.KeyVaultCredentials(authenticator);
var client = new KeyVault.KeyVaultClient(credentials);


let secretName = 'NomeChave'
secretVersion = ''
client.getSecret(vaultUri, secretName, secretVersion).then((result) => {
    console.log(result);
})