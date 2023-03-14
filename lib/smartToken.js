const NodeCache = require( "node-cache" );
const tokenCache = new NodeCache();
const smartServiceMetadata = require('../conf/smartServiceMetadata')
const smartClientConfig = require('../conf/smartClientConfig')
const smartGrantConfig = require('../conf/smartGrantConfig')
var { Issuer } = require("openid-client");

function getAccessToken(){
    console.log("obtaining access token from cache")
    var access_token = tokenCache.get( "access_token" );
    if ( access_token == undefined ){
        console.log("no access token in cache")
        return newAccessToken()
    }    
    return access_token
}

async function newAccessToken(){
    const iss = new Issuer(smartServiceMetadata)
    var client = new iss.Client(smartClientConfig)
    var tokenset = await client.grant(smartGrantConfig)
    console.log("getting a new token from auth server")
    tokenCache.set("access_token", tokenset.access_token, tokenset.expires_in)
    console.info(tokenset.access_token)
    return tokenset.access_token
}

module.exports = { getAccessToken }