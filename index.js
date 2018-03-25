// setup global variables
const config = require('./config.json');
var prefix_default = config.prefix_default;
var devlist = ['mklprud3nce', 'MineBerserker'];
var prefix_MinerClan = config.prefix_MinerClan;
var prefix_PR = config.prefix_PR;

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    // console.log('Ready!');
});

// login to Discord with your app's token
client.login(config.token);

client.on('message', message => {

    switch(message.guild.id) {

        // Miner's Clan
        case '417584740758061056':
            if (message.content.substring(0, prefix_MinerClan.length) == prefix_MinerClan) {
                let args = message.content.substring(prefix_MinerClan.length).split(' ');
                let cmd = args[0];
                let isdev = devlist.includes(message.author.username);

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
                        break;

                    case 'prefix':
                        if (args[0] == 'reset') {
                            prefix_MinerClan = config.prefix_MinerClan;
                            message.channel.send(`Prefix resetted back to default: ${prefix_MinerClan}`);
                        }
                        else{
                            prefix_MinerClan = args[0];
                            message.channel.send(`Prefix changed to: ${prefix_MinerClan}`);
                        }
                        break;
                }
            }
            break;

        // P&R dev Server
        case '275235526330810369':
            if (message.content.substring(0, prefix_PR.length) == prefix_PR) {
                let args = message.content.substring(prefix_PR.length).split(' ');
                let cmd = args[0];
                let isdev = devlist.includes(message.author.username);

                // cut out args[0] the cmd
                args = args.splice(1);

                // sense cmd
                switch(cmd) {
                    case 'ping':
                        message.channel.send('Dev Server ping pong madness, test!!!');
                        break;

                    case 'prefix':
                        if (args[0] == 'reset') {
                            prefix_PR = config.prefix_PR;
                            message.channel.send(`Prefix resetted back to default: ${prefix_PR}`);
                        }
                        else{
                            prefix_PR = args[0];
                            message.channel.send(`Prefix changed to: ${prefix_PR}`);
                        }
                        break;
                }
            }
            break;

    }

});
