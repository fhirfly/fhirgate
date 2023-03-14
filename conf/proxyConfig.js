const FHIR_URL = 'https://fhir-ehr.sandboxcerner.com/r4/'
const smartToken = require('../lib/smartToken')
proxyTable =
{
    "/Patient" : FHIR_URL
}
proxyConfig =
{
    target: FHIR_URL,
    router: proxyTable,
    changeOrigin: true,
    logLevel : 'debug', 
    onProxyReq: function onProxyReq(proxyReq, req, res) {
            var access_token = smartToken.getAccessToken()
            proxyReq.setHeader('Authorization', 'Bearer ' + access_token)
    },
       
}

module.exports = proxyConfig
