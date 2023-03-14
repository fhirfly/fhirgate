//const morganBody = require('morgan-body')
//const bodyParser = require('body-parser')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
var morgan = require('morgan')
const proxyConfig = require('./conf/proxyConfig')
const smartToken = require('./lib/smartToken')
const app = express()
const FHIRProxy = createProxyMiddleware(proxyConfig)


smartToken.getAccessToken() 
//app.use(bodyParser.json())
//morganBody(app, {logAllResHeader: true, logAllReqHeader: true })
app.use(FHIRProxy) // add the proxy to express
app.listen(3000)

