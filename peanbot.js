var config = require('config');
var fs = require("fs");

// var me = 'U04SK2EQE';
var me = config.get('slack.me');
var peandev = config.get('slack.devchannel');

var slackAPI = require('slackbotapi');
var slack = new slackAPI({
  'token': config.get('slack.bot_token'),
  'logging': true
});


// Slack on EVENT message, send data.
slack.on('message', function(data) {
  // If no text, return.
  if(typeof data.text == 'undefined') return;

  if(data.text === 'Where is pean?') {
    slack.sendMsg(data.channel, "@"+slack.getUser(data.user).name+": Not sure but I will ask him.")
    slack.sendPM(me,"@"+slack.getUser(data.user).name+' wants to know where you are');

  }


  // Checkin/out
  
  // Monitor these users
  cu = config.get('slack.checkin_monitor');

  var re = /#checkin/g;
  if(re.test(data.text)) {
    if(cu.indexOf(slack.getUser(data.user).name) > -1) {
      slack.sendPM(me,'<@'+data.user+'|'+slack.getUser(data.user).name+'> checked in');
    }
  }
  var re = /#checkout/g;
  if(re.test(data.text)) {
    if(cu.indexOf(slack.getUser(data.user).name) > -1) {
      slack.sendPM(me,'<@'+data.user+'|'+slack.getUser(data.user).name+'> checked out');
    }
  }
  // check in/out end

});