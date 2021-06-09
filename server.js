// server.js
var express = require('express')
// eslint-disable-next-line no-unused-vars
var path = require('path')
var serveStatic = require('serve-static')
// eslint-disable-next-line no-undef
app = express()
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-path-concat
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-path-concat
app.use(serveStatic(__dirname + '/dist'))

// Catch all routes and redirect to the index file
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

// const Pusher = require('pusher')

// const pusher = new Pusher({
//   appId: '753198',
//   key: 'dd2c47e512b958a7b270',
//   secret: '51b1abef6c597e5f0a42',
//   cluster: 'eu'
// })

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// app.post('/pusher/auth', function(req, res) {
//   var socketId = req.body.socket_id
//   var channel = req.body.channel_name
//   var auth = pusher.authenticate(socketId, channel)
//   res.send(auth)
// })

var port = process.env.PORT || 5000
// eslint-disable-next-line no-undef

app.listen(port)
console.log('server started ' + port)
