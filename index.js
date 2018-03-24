var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var prefix = 'm!';
var devlist = ["mklprud3nce","bentuxthecow"];
var spam_status = true;
var spam_channelID=426616355026894848;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `m!`
	if (message.substring(0, prefix.length) == prefix) {
        var args = message.substring(prefix.length).split(' ');
        var cmd = args[0];
		var isdev = devlist.includes(user);
		
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
				break;
			case 'prefix':
				switch(args[0]){
					case 'reset':
						bot.sendMessage({
							to: channelID,
							message: 'Prefix reset to m!'
						});
						prefix = 'm!';
						break;
					default:	
						bot.sendMessage({
							to: channelID,
							message: 'Changed prefix to '+args[0]
						});
						prefix = args[0];
				}		
				break;
			case 'checkinput':
                bot.sendMessage({
                    to: channelID,
                    message: 'The sub-input is "'+args+"'"
                });
				bot.sendMessage({
                    to: channelID,
                    message: 'The channelID is "'+channelID+"'"
                });
				break;
			case 'caller':
				bot.sendMessage({
                    to: channelID,
                    message: user
                });
				break;
			case 'checkdev':
				if (isdev){      
					bot.sendMessage({
						to: channelID,
						message: "Hello Clan Developers!!!"
					});
				}else{
					bot.sendMessage({
						to: channelID,
						message: "Nope U are not a clan developer :("
					});
				}
				break;
			case 'disconnect':
				if (isdev){
					bot.sendMessage({
						to: channelID,
						message: 'Bot disconnecting....'
					});
					bot.sendMessage({
						to: channelID,
						message: 'Initiated by: '+user
					});
					setTimeout(function(){bot.disconnect()},1000);
				}else{
					bot.sendMessage({
						to: channelID,
						message: 'You do not have permission!!!'
					});
				}	
				break;
			case 'spam_start':
				bot.sendMessage({
					to: channelID,
					message: 'Spamming doesnt work :(, pokeman bot sensed that i am a bot'
				});
				for (i=0; false;i++){
					setTimeout(function(){
						bot.sendMessage({
							to: channelID,
							message: 'm!spam_start'
						});
					},500);
				}
			// Just add any case commands if you want to..
         }
     }
});

bot.on('any',function(event){
	//All event listener
	if(true){
		bot.sendMessage({
				to: spam_channelID,
				message: 'bot spammage'
		});
		setTimeout(function(){
			bot.sendMessage({
				to: spam_channelID,
				message: 'bot spammage'
			});
		},1000);	
	}

});	