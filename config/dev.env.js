'use strict'
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL:
  //  '"http://127.0.0.1:8000"'                   // => Local Backend
  '"https://backendbutiko.com"'             //=> AWS
  //'"https://envios-backend.herokuapp.com"'  //=> Heroku

})
