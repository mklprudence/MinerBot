// setup global variables
const config = require('./config.json');
var simServer = 275235526330810369;
var simServerName = 'Not Simulating';

// setup devlist
var devlist_MinerClan = [config.ID_mklprud3nce, config.ID_MineBerserker];
var devlist_PR = [config.ID_mklprud3nce, config.ID_bentuxthecow];
var devlist_GamingInc = [config.ID_mklprud3nce, config.ID_JackIsBeast];

// setup prefix
var prefix_default = config.prefix_default;
var prefix_MinerClan = config.prefix_MinerClan;
var prefix_PR = config.prefix_PR;
var prefix_GamingInc = config.prefix_GamingInc;

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

    // Miner's Clan
    if (message.guild.id == '417584740758061056' || simServer == 417584740758061056) {
        if (message.content.substring(0, prefix_MinerClan.length) == prefix_MinerClan) {
            let args = message.content.substring(prefix_MinerClan.length).split(' ');
            let cmd = args[0];
            let isdev = devlist_MinerClan.includes(message.author.id);

            // cut out args[0] the cmd
            args = args.splice(1);
            // sense cmd
            switch(cmd) {
                case 'ping':
                    if (isdev) {
                        message.channel.send('The Bot Ping: ' + client.ping);
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
                    else if (args[0] == undefined) {
                        message.channel.send('Please enter a valid prefix!!!');
                        message.channel.send('Command Usage: m!prefix [NewPrefix]');
                    }
                    else{
                        prefix_MinerClan = args[0];
                        message.channel.send(`Prefix changed to: ${prefix_MinerClan}`);
                    }
                    break;
                case 'apply':
                    message.channel.send('Link for Clan Application:');
                    message.channel.send('https://savage.games/threads/miners-clan.82081/#post-241344');
                    break;
            }
        }
    }

    // P&R dev Server
    if (message.guild.id == '275235526330810369') {
        if (message.content.substring(0, prefix_PR.length) == prefix_PR) {
            let args = message.content.substring(prefix_PR.length).split(' ');
            let cmd = args[0];
            let isdev = devlist_PR.includes(message.author.id);

            // cut out args[0] the cmd
            args = args.splice(1);

            if (simServer == 275235526330810369) {
                // sense cmd in case of no simulation
                switch(cmd) {
                    case 'ping':
                        message.channel.send('The Bot Ping: ' + client.ping);
                        break;

                    case 'prefix':
                        if (args[0] == 'reset') {
                            prefix_PR = config.prefix_PR;
                            message.channel.send(`Prefix resetted back to default: ${prefix_PR}`);
                        }
                        else if (args[0] == undefined) {
                            message.channel.send('Please enter a valid prefix!!!');
                            message.channel.send('Command Usage: m!prefix [NewPrefix]');
                        }
                        else{
                            prefix_PR = args[0];
                            message.channel.send(`Prefix changed to: ${prefix_PR}`);
                        }
                        break;

                    case 'simulation':
                        if (args[0] == 'MinerClan') {
                            simServer = 417584740758061056;
                            simServerName = 'MinerClan';
                            message.channel.send(`simulationID set as ${simServer}, currently simulating ${simServerName}`);
                        }
                        else if (args[0] == 'GamingInc') {
                            simServer = 423877278510874644;
                            simServerName = 'GamingInc';
                            message.channel.send(`simulationID set as ${simServer}, currently simulating ${simServerName}`);
                        }
                        else if (args[0] == 'end') {
                            message.channel.send('No simulation is currently running!!!');
                        }
                        else {
                            message.channel.send('Use a valid ServerName to start simulation!!!');
                            message.channel.send(' - MinerClan  |  Skybounds Clan created by MineBerserker');
                            message.channel.send(' - GamingInc  |  Gaming group created by JackIsBeast');
                        }
                        break;
                }
            }
            else{
                // sense cmd in case with simulation
                switch(cmd) {
                    case 'simulation':
                        if (args[0] == 'end') {
                            simServer = 275235526330810369;
                            simServerName = 'Not Simulating';
                            message.channel.send('Simulation ended!!!');
                        }
                        else {
                            message.channel.send(`Now simulating ${simServerName}, ID: ${simServer}`);
                            message.channel.send(`Please use ${prefix_PR}simulation end, to terminate the current simulation`);
                        }
                        break;
                }
            }
            
        }
    }

    // GamingInc Server
    if (message.guild.id == '423877278510874644') {
        if (message.content.substring(0, prefix_MinerClan.length) == prefix_MinerClan) {
            let args = message.content.substring(prefix_MinerClan.length).split(' ');
            let cmd = args[0];
            let isdev = devlist_GamingInc.includes(message.author.id);

            // cut out args[0] the cmd
            args = args.splice(1);

            switch (cmd){
                case 'ping':
                    if (isdev) {
                        message.channel.send('The Bot Ping: ' + client.ping);
                    }
                    else{
                        message.channel.send('Sorry ' + message.author.username + ', You do not have permission to do so');
                    }
                    break;
            }
        }
    }
});
