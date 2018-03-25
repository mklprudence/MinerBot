// setup global variables
var prefix = 'm!';
var devlist = ['mklprud3nce', 'bentuxthecow'];

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});

// login to Discord with your app's token
client.login('NDI3MDQxNzkxNDA1OTgxNjk3.DZeyhw.JJvHlnYYZG9mtJb1qjEJku1zTYk');

client.on('message', message => {
    console.log(message.content);
    if (message.content.substring(0, prefix.length) == prefix) {
        var args = message.content.substring(prefix.length).split(' ');
        var cmd = args[0];
        var isdev = devlist.includes(message.author.username);

        // cut out args[0] the cmd
        args = args.splice(1);

        // sense cmd
        switch(cmd) {
            case 'ping':
                if (isdev) {
                    message.channel.send('Pong!');
                }
                else{
                    message.channel.send('Sorry ' + message.author.username + ', You do not have permission to do so');
                }
        }
    }
});
