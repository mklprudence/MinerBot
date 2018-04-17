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
        const discUser = client.users.get(id) || { 'username': 'not in client user list' };
        if (user) {
            const target = await Users.findByPrimary(id);
            target.login(client.uptime);
            console.log(`Member ${discUser.username} (${id}) logged in`);
            user.save();
            userSession.set(id, target);
            return user.save();
        }
        const newUser = await Users.create({
            user_id: id,
            login_status: true,
            current_session_start: String(new Date().getTime()),
        });
        userSession.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(userSession, 'logout', {
    value: async function logout(id) {
        const user = userSession.get(id);
        const discUser = client.users.get(id) || { 'username': 'not in client user list' };
        if (user) {
            const target = await Users.findByPrimary(id);
            target.logout(client.uptime);
            console.log(`Member ${discUser.username} (${id}) logged out`);
            user.save();
            userSession.set(id, target);
            return user.save();
        }
        const newUser = await Users.create({
            user_id: id,
            login_status: false,
            total_login: String(client.uptime),
            last_session_start: String((new Date().getTime() - client.uptime)),
            last_session_end: String(new Date().getTime()),
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

client.on('message', async message => {

    // Miner's Clan
    if (message.guild.id == '417584740758061056' || simServer == 417584740758061056) {
        if (message.content.startsWith(prefix_MinerClan)) {
            let args = message.content.substring(prefix_MinerClan.length).split(' ');
            let cmd = args.shift();
            let isAdmin = message.member.hasPermission('ADMINISTRATOR');

            // sense cmd
            if (cmd == 'ping') {
                if (isAdmin) {
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
            else if (cmd == 'login') {
                if (isAdmin) {
                    const target = message.mentions.users.first() || 'all';
                    if (target == 'all') {
                        message.channel.send(`Login Session Query of All Member of ${message.guild.name} Initiated by <@!${message.author.id}>`);
                        return message.channel.send(
                            userSession.sort((a, b) => b.total_login - a.total_login)
                                .filter(user => client.users.has(user.user_id))
                                .filter(user => message.guild.members.has(user.user_id))
                                .filter(user => !client.users.get(user.user_id).bot)
                                .map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${Math.floor(user.total_login / (1000 * 60 * 60 * 24))} days ${Math.floor((user.total_login % 86400000) / (1000 * 60 * 60))} hours ${Math.floor((user.total_login % 3600000) / (1000 * 60))} Minutes ${Math.floor((user.total_login % 60000) / (1000))} Seconds`)
                                .join('\n'),
                            { code: true, split: true }
                        );
                    }
                    else {
                        const DB = await Users.findByPrimary(target.id);
                        let msg = [];
                        message.channel.send(`Login Session Query of <@!${target.id}> Initiated by <@!${message.author.id}>`);
                        if (target.presence.status != 'offline') {
                            msg = [
                                `${target.tag}:`,
                                `Total login: ${Math.floor(Number(DB.total_login) / (1000 * 60 * 60 * 24))} days ${Math.floor((Number(DB.total_login) % 86400000) / (1000 * 60 * 60))} hours ${Math.floor((Number(DB.total_login) % 3600000) / (1000 * 60))} Minutes ${Math.floor((Number(DB.total_login) % 60000) / (1000))} Seconds`,
                                ' ',
                                'Last Login Session: ',
                                `Start: ${new Date(Number(DB.last_session_start))}`,
                                `End: ${new Date(Number(DB.last_session_end))}`,
                                ' ',
                                'Player currently logged in',
                                `Current login starts at ${new Date(Number(DB.current_session_start))}`,
                            ];
                        }
                        else {
                            msg = [
                                `${target.tag}:`,
                                `Total login: ${Math.floor(Number(DB.total_login) / (1000 * 60 * 60 * 24))} days ${Math.floor((Number(DB.total_login) % 86400000) / (1000 * 60 * 60))} hours ${Math.floor((Number(DB.total_login) % 3600000) / (1000 * 60))} Minutes ${Math.floor((Number(DB.total_login) % 60000) / (1000))} Seconds`,
                                ' ',
                                'Last Login Session: ',
                                `Start: ${new Date(Number(DB.last_session_start))}`,
                                `End: ${new Date(Number(DB.last_session_end))}`,
                                ' ',
                                'Member is currently offline',
                            ];
                        }
                        return message.channel.send(
                            msg.join('\n'),
                            { code: true }
                        );
                    }
                }
                else {
                    message.channel.send('Sorry ' + message.author.username + ', You do not have permission to do so');
                }
            }
            else if (cmd == 'help') {
                const help_ping = [
                    'Obtain the bot status',
                    'Displays Bot ping and uptime',
                    ' ',
                    ' ',
                    '.',
                ];
                const help_login = [
                    '[-PlayerMention]   OPTIONAL   eg. @MineBerserker',
                    ' ',
                    'If given [-PlayerMention], Bot will display detailed login data of the player',
                    'If not given [-PlayerMention], Bot will display all total login time of all players',
                    ' ',
                    ' ',
                    '.',
                ];
                const help_help = [
                    'Displays this help menu',
                    ' ',
                    ' ',
                    '.',
                ];
                const description = [
                    `The prefix of the bot is ${prefix_MinerClan}`,
                    ' ',
                    ' ',
                    '.',
                ];
                message.channel.send({ embed: {
                    color: 16514816,
                    title: 'MKLBot Command Help',
                    description: description.join('\n'),
                    fields: [
                        {
                            name: `${prefix_MinerClan}ping`,
                            value: help_ping.join('\n'),
                        },
                        {
                            name: `${prefix_MinerClan}login [-PlayerMention] (REQUIRES ADMIN)`,
                            value: help_login.join('\n'),
                        },
                        {
                            name: `${prefix_MinerClan}help`,
                            value: help_help.join('\n'),
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: '©mklprudence',
                        icon_url: client.user.avatarURL,
                    },
                } });
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
                else if (cmd == 'dev') {
                    if (args[0] == 'input') {
                        args.shift();
                        console.log(`The input is:${args.join(' ')}`);
                    }
                    else if (args[0] == 'emoji') {
                        const emoji = client.emojis.find('identifier', args[1]);
                        message.channel.send(`${emoji}`);
                    }
                    else if (args[0] == 'emojilist') {
                        const emojiList = client.emojis.map(e=>e.toString()).join(" ");
                        message.channel.send(emojiList);
                    }
                    else if (args[0] == 'reactionlist') {
                        message.channel.fetchMessage(args[1])
                            .then(msg => message.channel.send(msg.reactions.map(r => r.emoji.name).join('\n')))
                            .catch(console.error);
                    }
                    else if (args[0] == 'reactioncount') {
                        message.channel.fetchMessage(args[1])
                            .then(msg => message.channel.send(msg.reactions.find(val => val.emoji.name == args[2]).count))
                            .catch(console.error);
                    }
                    else if (args[0] == 'reactionkey') {
                        args.shift();
                        message.channel.fetchMessage(args[0])
                            .then(msg => message.channel.send(msg.reactions.filter(val => val.emoji.name == args[1]).firstKey()))
                            .catch(console.error);
                    }
                }
                else if (cmd == 'removereaction') {
                    /* message.channel.fetchMessage(args[0])
                            .then(msg => msg.reactions.delete(msg.reactions.filter(val => val.emoji.name == args[1]).firstKey()))
                            .catch(console.error);*/
                    message.channel.fetchMessage(args[0])
                        .then(msg => msg.reactions.delete(args[1]))
                        .catch(console.error);
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
            let isAdmin = message.member.hasPermission('ADMINISTRATOR');

            if (cmd == 'ping') {
                if (true) {
                    message.channel.send('The Bot Ping: ' + client.ping);
                    message.channel.send('The Bot Uptime: ' + client.uptime);
                }
                else{
                    message.channel.send('Sorry ' + message.author.username + ', You do not have permission to do so');
                }
            }
            else if (cmd == 'login') {
                if (isAdmin) {
                    let target;
                    if (args[0] == undefined || args[0] == null) {
                        target = 'all';
                    }
                    else if (args[0].toLowerCase() == 'staff') {
                        target = 'staff';
                    }
                    else if (message.mentions.users.first() != undefined && message.mentions.users.first() != null) {
                        target = message.mentions.users.first();
                    }
                    else{
                        return message.channel.send('<@!266401880362450944> idk why there is something wrong with the login command');
                    }
                    if (target == 'all') {
                        message.channel.send(`Login Session Query of All Member of ${message.guild.name} Initiated by <@!${message.author.id}>`);
                        message.channel.send('**The total online time excludes the current session**');
                        return message.channel.send(
                            userSession.sort((a, b) => b.total_login - a.total_login)
                                .filter(user => client.users.has(user.user_id))
                                .filter(user => message.guild.members.has(user.user_id))
                                .filter(user => !client.users.get(user.user_id).bot)
                                .map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${Math.floor(user.total_login / (1000 * 60 * 60 * 24))} days ${Math.floor((user.total_login % 86400000) / (1000 * 60 * 60))} hours ${Math.floor((user.total_login % 3600000) / (1000 * 60))} Minutes ${Math.floor((user.total_login % 60000) / (1000))} Seconds`)
                                .join('\n'),
                            { code: true, split: true }
                        );
                    }
                    else if (target == 'staff') {
                        message.channel.send(`Login Session Query of All Staff Member of ${message.guild.name} Initiated by <@!${message.author.id}>`);
                        message.channel.send(`Query Time: ${new Date()}`);
                        return message.channel.send(
                            userSession.sort((a, b) => b.total_login - a.total_login)
                                .filter(user => client.users.has(user.user_id))
                                .filter(user => message.guild.members.has(user.user_id))
                                .filter(user => message.guild.members.get(user.user_id).hasPermission('MENTION_EVERYONE'))
                                .filter(user => !client.users.get(user.user_id).bot)
                                .map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${Math.floor(user.total_login / (1000 * 60 * 60 * 24))} days ${Math.floor((user.total_login % 86400000) / (1000 * 60 * 60))} hours ${Math.floor((user.total_login % 3600000) / (1000 * 60))} Minutes ${Math.floor((user.total_login % 60000) / (1000))} Seconds`)
                                .join('\n'),
                            { code: true, split: true }
                        );
                    }
                    else {
                        const DB = await Users.findByPrimary(target.id);
                        let msg = [];
                        message.channel.send(`Login Session Query of <@!${target.id}> Initiated by <@!${message.author.id}>`);
                        message.channel.send('**The total online time excludes the current session**');
                        if (!DB) {
                            return message.channel.send('There is no login data', { code: true });
                        }
                        if (target.presence.status != 'offline') {
                            msg = [
                                `${target.tag}:`,
                                `Total online time: ${Math.floor(Number(DB.total_login) / (1000 * 60 * 60 * 24))} days ${Math.floor((Number(DB.total_login) % 86400000) / (1000 * 60 * 60))} hours ${Math.floor((Number(DB.total_login) % 3600000) / (1000 * 60))} Minutes ${Math.floor((Number(DB.total_login) % 60000) / (1000))} Seconds`,
                                ' ',
                                'Last Login Session: ',
                                `Start: ${new Date(Number(DB.last_session_start))}`,
                                `End: ${new Date(Number(DB.last_session_end))}`,
                                ' ',
                                'Player currently logged in',
                                `Current login starts at ${new Date(Number(DB.current_session_start))}`,
                            ];
                        }
                        else {
                            msg = [
                                `${target.tag}:`,
                                `Total online time: ${Math.floor(Number(DB.total_login) / (1000 * 60 * 60 * 24))} days ${Math.floor((Number(DB.total_login) % 86400000) / (1000 * 60 * 60))} hours ${Math.floor((Number(DB.total_login) % 3600000) / (1000 * 60))} Minutes ${Math.floor((Number(DB.total_login) % 60000) / (1000))} Seconds`,
                                ' ',
                                'Last Login Session: ',
                                `Start: ${new Date(Number(DB.last_session_start))}`,
                                `End: ${new Date(Number(DB.last_session_end))}`,
                                ' ',
                                'Member is currently offline',
                            ];
                        }
                        return message.channel.send(
                            msg.join('\n'),
                            { code: true }
                        );
                    }
                }
                else {
                    message.channel.send('Sorry ' + message.author.username + ', You do not have permission to do so');
                }
            }
            else if (cmd == 'help') {
                const help_ping = [
                    'Obtain the bot status',
                    'Displays Bot ping and uptime',
                    ' ',
                    ' ',
                    '.',
                ];
                const help_login = [
                    '[-PlayerMention]   OPTIONAL   eg. @JackTheBeast',
                    ' ',
                    'If given [-PlayerMention], Bot will display detailed login data of the player',
                    'If not given [-PlayerMention], Bot will display all total login time of all players',
                    ' ',
                    ' ',
                    '.',
                ];
                const help_help = [
                    'Displays this help menu',
                    ' ',
                    ' ',
                    '.',
                ];
                const description = [
                    `The prefix of the bot is ${prefix_GamingInc}`,
                    ' ',
                    ' ',
                    '.',
                ];
                message.channel.send({ embed: {
                    color: 16514816,
                    title: 'MKLBot Command Help',
                    description: description.join('\n'),
                    fields: [
                        {
                            name: `${prefix_GamingInc}ping`,
                            value: help_ping.join('\n'),
                        },
                        {
                            name: `${prefix_GamingInc}login [-PlayerMention] (REQUIRES ADMIN)`,
                            value: help_login.join('\n'),
                        },
                        {
                            name: `${prefix_GamingInc}help`,
                            value: help_help.join('\n'),
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: '©mklprudence',
                        icon_url: client.user.avatarURL,
                    },
                } });
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
