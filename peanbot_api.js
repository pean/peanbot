var config = require('config');
var request = require('request');
var express = require('express')

var app = express()
var router = express.Router();

 var url = "https://slack.com/api/chat.postMessage"
 
var token = config.get('slack.user_token');
 
var api_key = config.get('slack.api_key');
var channel = config.get('slack.checkin_channel');

console.info('Starting peanbot api');

app.all('*',function(req, res, next) {

  if(req.query.key != api_key) {
    console.info('auth failed');
    res.status(401).json({ "success": false }).end();
  } else {
    next();
  }

});

app.get('/checkout', function (req, res) {
  console.log('checkout action');
  var data = {
    token: token,
    channel: channel,
    text: "#checkout",
    as_user: true
  };

  request.post(url, { form: data });
  res.json({ "success": true }).end();

});

app.get('/checkin', function (req, res) {

  var data = {
    token: token,
    channel: channel,
    text: "#checkin",
    as_user: true
  };

  request.post(url, { form: data });
  res.json({ "success": true }).end();

});
 
app.listen(3001);

console.info('peanbot api started');