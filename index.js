// setup global variables
const config = require('./config.json');
var simServer = 275235526330810369;
var simServerName = 'Not Simulating';

// setup devlist
var adminlist_MinerClan = [config.ID_mklprud3nce, config.ID_MineBerserker];
var adminlist_PR = [config.ID_mklprud3nce, config.ID_bentuxthecow];
var adminlist_GamingInc = [config.ID_mklprud3nce, config.ID_JackIsBeast];

// setup prefix
var prefix_default = config.prefix_default;
var prefix_MinerClan = config.prefix_MinerClan;
var prefix_PR = config.prefix_PR;
var prefix_GamingInc = config.prefix_GamingInc;

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// getting database
const { Users } = require('./dbObjects');
const userSession = new Discord.Collection();

// Helper functions
Reflect.defineProperty(userSession, 'login', {
    value: async function login(id) {
        const user = userSession.get(id);
        if (user) {
            const target = await Users.findByPrimary(id);
            target.login(client.uptime);
            console.log(`Member with ${id} logged in`);
            return user.save();
        }
        const newUser = await Users.create({
            user_id: id,
            login_status: true,
            current_session_start: new Date().getTime(),
        });
        userSession.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(userSession, 'logout', {
    value: async function logout(id) {
        const user = userSession.get(id);
        if (user) {
            const target = await Users.findByPrimary(id);
            target.logout(client.uptime);
            console.log(`Member with ${id} logged out`);
            return user.save();
        }
        const newUser = await Users.create({
            user_id: id,
            login_status: false,
            last_session_start: (new Date().getTime() - client.uptime),
            last_session_end: new Date().getTime(),
        });
        userSession.set(id, newUser);
        return newUser;
    },
});

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});

client.once('ready', async () => {
    const storedUserSession = await Users.findAll();
    storedUserSession.forEach(s => userSession.set(s.user_id, s));
    console.log(`Logged in as ${client.user.tag}!`);
});
// login to Discord with your app's token
client.login(config.token);

client.on('message', message => {

    // Miner's Clan
    if (message.guild.id == '417584740758061056' || simServer == 417584740758061056) {
        if (message.content.startsWith(prefix_MinerClan)) {
            let args = message.content.substring(prefix_MinerClan.length).split(' ');
            let cmd = args.shift();
            let isdev = adminlist_MinerClan.includes(message.author.id);

            // sense cmd
            if (cmd == 'ping') {
                if (isdev) {
                    message.channel.send('The Bot Ping: ' + client.ping);
                }
                else{
                    message.channel.send('Sorry ' + message.author.username + ', You do not have permission to do so');
                }
            }
            else if (cmd == 'prefix') {
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
            }
            else if (cmd == 'apply') {
                message.channel.send('Link for Clan Application:');
                message.channel.send('https://savage.games/threads/miners-clan.82081/#post-241344');
            }
            else if (cmd == 'pokemon') {
                if (args[0] == 'initiate') {
                    message.channel.send('/start');
                    setTimeout(function() {message.channel.send('/pick Charmander');}, 1000);
                }
            }
            else if (cmd == 'log') {
                if (isdev) {
                    console.log(args.join(' '));
                    if (args[0].startsWith('<@!') && args[0].endsWith('>')) {
                        const mentionID = args[0].slice(3, (args[0].length - 1));
                        console.log(`args[0] is a mention, the mention id is ${mentionID}`);
                        console.log(`log time is ${new Date().getTime()}`);
                    }
                }
                else {
                    message.channel.send('Sorry ' + message.author.username + ', You do not have permission to do so');
                }
            }
        }
    }

    // P&R dev Server
    if (message.guild.id == '275235526330810369') {
        if (message.content.startsWith(prefix_PR)) {
            let args = message.content.substring(prefix_PR.length).split(' ');
            let cmd = args.shift();
            let isdev = adminlist_PR.includes(message.author.id);

            if (simServer == 275235526330810369) {
                // sense cmd in case of no simulation
                if (cmd == 'ping') {
                    message.channel.send('The Bot Ping: ' + client.ping);
                }                      
                else if (cmd == 'prefix') {
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
                }
                else if (cmd == 'simulation') {
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
                }
            }
            else{
                // sense cmd in case with simulation
                if (cmd == 'simulation') {
                    if (args[0] == 'end') {
                        simServer = 275235526330810369;
                        simServerName = 'Not Simulating';
                        message.channel.send('Simulation ended!!!');
                    }
                    else {
                        message.channel.send(`Now simulating ${simServerName}, ID: ${simServer}`);
                        message.channel.send(`Please use ${prefix_PR}simulation end, to terminate the current simulation`);
                    }
                }
            }
        }
    }

    // GamingInc Server
    if (message.guild.id == '423877278510874644' || simServer == 423877278510874644) {
        if (message.content.startsWith(prefix_GamingInc)) {
            let args = message.content.substring(prefix_GamingInc.length).split(' ');
            let cmd = args.shift();
            let isdev = adminlist_GamingInc.includes(message.author.id);

            if (cmd == 'ping') {
                if (true) {
                    message.channel.send('The Bot Ping: ' + client.ping);
                    message.channel.send('The Bot Uptime: ' + client.uptime);
                }
                else{
                    message.channel.send('Sorry ' + message.author.username + ', You do not have permission to do so');
                }
            }
        }
    }
});

// Update of presence of Users in guild of bot
client.on('presenceUpdate', (oldMember, newMember)=> {
    /* test of update using console log
    console.log('old: ');
    console.log(oldMember.user.username);
    console.log(oldMember.guild.name);
    console.log(oldMember.presence);
    console.log('new: ');
    console.log(newMember.user.username);
    console.log(newMember.guild.name);
    console.log(newMember.presence);*/
    if (oldMember.presence.status == 'offline' && newMember.presence.status != 'offline') {
        userSession.login(newMember.user.id);
    }
    else if (oldMember.presence.status != 'offline' && newMember.presence.status == 'offline') {
        userSession.logout(newMember.user.id);
    }
});
