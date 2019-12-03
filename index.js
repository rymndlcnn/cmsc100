
const mysql = require('mysql');
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
var app = express()
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;



app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)


var Users = require('./Routers/router.js')

app.use(Users)

app.listen(port, ipaddr, () => {
    console.log("Server is running on " + ipaddr +":"+ port)
})