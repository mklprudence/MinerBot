// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

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

// setup lyrics
const lyrics_SOU = [
    'The club isn\'t the best place to find a lover',
    'So the bar is where I go',
    'Me and my friends at the table doing shots',
    'Drinking fast and then we talk slow',
    'Come over and start up a conversation with just me',
    'And trust me I\'ll give it a chance now',
    'Take my hand, stop, put Van the Man on the jukebox',
    'And then we start to dance, and now I\'m singing like',
    ' ',
    'Girl, you know I want your love',
    'Your love was handmade for somebody like me',
    'Come on now, follow my lead',
    'I may be crazy, don\'t mind me',
    'Say, boy, let\'s not talk too much',
    'Grab on my waist and put that body on me',
    'Come on now, follow my lead',
    'Come, come on now, follow my lead',
];
const lyrics_SOU1 = [
    'I\'m in love with the shape of you',
    'We push and pull like a magnet do',
    'Although my heart is falling too',
    'I\'m in love with your body',
    'And last night you were in my room',
    'And now my bedsheets smell like you',
    'Every day discovering something brand new',
    'I\'m in love with your body',
    'Oh—I—oh—I—oh—I—oh—I',
    'I\'m in love with your body',
    'Oh—I—oh—I—oh—I—oh—I',
    'I\'m in love with your body',
    'Oh—I—oh—I—oh—I—oh—I',
    'I\'m in love with your body',
    'Every day discovering something brand new',
    'I\'m in love with the shape of you',
    ' ',
    'One week in we let the story begin',
    'We\'re going out on our first date',
    'You and me are thrifty, so go all you can eat',
    'Fill up your bag and I fill up a plate',
    'We talk for hours and hours about the sweet and the sour',
    'And how your family is doing okay',
    'Leave and get in a taxi, then kiss in the backseat',
    'Tell the driver make the radio play, and I\'m singing like',
];
const lyrics_SOU2 = [
    'Girl, you know I want your love',
    'Your love was handmade for somebody like me',
    'Come on now, follow my lead',
    'I may be crazy, don\'t mind me',
    'Say, boy, let\'s not talk too much',
    'Grab on my waist and put that body on me',
    'Come on now, follow my lead',
    'Come, come on now, follow my lead',
    ' ',
    'I\'m in love with the shape of you',
    'We push and pull like a magnet do',
    'Although my heart is falling too',
    'I\'m in love with your body',
    'And last night you were in my room',
    'And now my bedsheets smell like you',
    'Every day discovering something brand new',
    'I\'m in love with your body',
    'Oh—I—oh—I—oh—I—oh—I',
    'I\'m in love with your body',
    'Oh—I—oh—I—oh—I—oh—I',
    'I\'m in love with your body',
    'Oh—I—oh—I—oh—I—oh—I',
    'I\'m in love with your body',
    'Every day discovering something brand new',
    'I\'m in love with the shape of you',
];
const lyrics_SOU3 = [
    'Come on, be my baby, come on',
    'Come on, be my baby, come on',
    'Come on, be my baby, come on',
    'Come on, be my baby, come on',
    'Come on, be my baby, come on',
    'Come on, be my baby, come on',
    'Come on, be my baby, come on',
    'Come on, be my baby, come on',
    ' ',
    'I\'m in love with the shape of you',
    'We push and pull like a magnet do',
    'Although my heart is falling too',
    'I\'m in love with your body',
    'And last night you were in my room',
    'And now my bedsheets smell like you',
    'Every day discovering something brand new',
    'I\'m in love with your body',
    'Oh—I—oh—I—oh—I—oh—I',
    'I\'m in love with your body',
    'Oh—I—oh—I—oh—I—oh—I',
    'I\'m in love with your body',
    'Oh—I—oh—I—oh—I—oh—I',
    'I\'m in love with your body',
    'Every day discovering something brand new',
    'I\'m in love with the shape of you',
];

// setup RSS
const RSSrolelist = [
    '440699202251784192',
    '440698928330178571',
    '440698717725655040',
    '440698334651482123',
    '440698578503991298',
    '440699557282709505',
    '444477142240329738',
    '444494561285242880',
];

// setup bot prefix list
const botprefixcollection = new Discord.Collection([
    ['?', { id: '155149108183695360', prefix: '?' }],
    [';;', { id: '184405311681986560', prefix: '?' }],
    ['!g', { id: '294882584201003009', prefix: '?' }],
    ['i!', { id: '409875566800404480', prefix: '?' }],
    ['j!', { id: '358968052500660226', prefix: '?' }],
    ['!', { id: '159985870458322944', prefix: '?' }],
    ['m!', { id: '428549968723443712', prefix: '?' }],
    ['r!', { id: '235088799074484224', prefix: '?' }],
    ['$', { id: '292953664492929025', prefix: '?' }],
    ['+', { id: '330416853971107840', prefix: '?' }],
]);

const botprefixarray = ['?', ';;', '!g', 'i!', 'j!', '!', 'm!', 'r!', '$', '+'];

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
    client.user.setActivity('MKLBot | m!help | v4.0.1', { type: 'PLAYING' }).catch(console.error);
    // client.setInterval(function() {RSS();}, 300000);
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
                    else if (args[0] == 'roleposition') {
                        message.channel.send(message.guild.roles.get(args[1]).position);
                    }
                }
                else if (cmd == 'removereaction') {
                    message.channel.fetchMessage(args[0])
                        .then(function(msg) {
                            msg.reactions.get(args[1]).fetchUsers().then(
                                users => users.forEach(val => msg.reactions.get(args[1]).remove(val))
                            )
                            .catch(console.error);
                            message.channel.send(`Reaction ${args[1]} Removed from message ${args[0]}`);
                        })
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
    if (message.guild.id == '423877278510874644' || message.guild.id == '439736642392162316' || simServer == 423877278510874644) {
        if (botprefixcollection.find(val => message.content.startsWith(val.prefix))) {
            const targetbotid = botprefixcollection.find(val => message.content.startsWith(val.prefix));
            client.channels.get('444518034015518720').send({ embed: {
                color: 16514816,
                author: {
                    name: message.author.tag,
                    icon_url: message.author.avatarURL,
                },
                description: `**<@!${message.author.id}> attempted to use a command of BOT <@!${targetbotid.id}> in ${message.channel}**\n${message.content}`,
                timestamp: new Date(),
                footer: {
                    text: '©mklprudence',
                    icon_url: client.user.avatarURL,
                },
            } });
        }
        if (message.content.startsWith(prefix_GamingInc)) {
            let args = message.content.substring(prefix_GamingInc.length).split(' ');
            let cmd = args.shift();
            const isAdmin = message.member.hasPermission('ADMINISTRATOR');
            const isHA = message.member.roles.has('439737576920711168');

            if (cmd == 'botinfo') {
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
                    '[-Staff]   OPTIONAL eg. \'Staff\', \'StAfF\', \'staff\'',
                    ' ',
                    'If given [-PlayerMention], Bot will display detailed login data of the player',
                    'If given [-Staff], Bot will display login time of all staff member',
                    'If not given both, Bot will display all total login time of all players',
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
                const description_staff = [
                    `The prefix of the bot is ${prefix_GamingInc}`,
                    'This help shows ONLY staff commands',
                    ' ',
                    ' ',
                    '.',
                ]
                const help_removereaction = [
                    '[-MsgID]   REQUIRED    obtained by right-clicking a message and press copyID',
                    '[-Emoji]   REQUIRED    eg. :joy:, :regional_indicator_N:',
                    ' ',
                    'Removes all users from the reaction [-Emoji] in the message with ID [-MsgID]',
                    ' ',
                    ' ',
                    '.',
                ];
                const help_rickroll = [
                    'Custom Command Giveaway #1, won by Soldier Gaming#4496, 26 Apr 2018',
                    'Only accessable by the winner',
                    ' ',
                    'Displays the \'Rick Astley - Never Gonna Give You Up\' Video',
                    ' ',
                    ' ',
                    '.',
                ];
                const help_userinfo = [
                    '[-UserKey]    REQUIRED    Can be the following User info type',
                    `   1. User ID, eg. ${message.author.id}`,
                    `   2. User username, eg. ${message.author.username} (CASE-SENSITIVE)`,
                    `   3. User nickname, eg. ${message.member.nickname} (CASE-SENSITIVE)`,
                    `   4. User mention, eg. <@${message.author.id}>`,
                    '   5. If no valid [-UserKey] is given, the command sender will be the target',
                    ' ',
                    'The Command will display detailed user information of the target user',
                    ' ',
                    ' ',
                    '.',
                ];
                const help_alladdrole = [
                    '[-RoleMention]   REQUIRED   eg. @Admin, @VIP',
                    ' ',
                    'Add all members from the entire guild to the Role mentioned in [-RoleMention]',
                    ' ',
                    '***WARNING!!!***',
                    'Be cautious when using this command!!! Be sure that you mentioned the correct role before sendin the command!!! Though the adding role process takes 2min+, there is no way to stop the process!!!',
                    'Contact mklprud3nce#0218 AT ONCE if any such mistakes have been made, because this means some more commands for him to programme',
                    ' ',
                    ' ',
                    '.',
                ];
                const help_lyrics = [
                    '[-Song]    REQUIRED    name or abbre. of song name',
                    ' ',
                    'Display the full lyrics of the song',
                    ' ',
                    'Song List: ',
                    '\'SOU\' / \'Shape of You\': Shape of You by Ed Sheeran (ONLY accessable by JackIsBeast)',
                    ' ',
                    ' ',
                    '.',
                ];
                const help_pingsub = [
                    'This command adds you to the Ping announcement alert role, and alert you when an announcemnet comes in',
                    ' ',
                    'Use m!pingunsub to unsubscribe from the announcement alert',
                ];
                const help_pingunsub = [
                    'This command removes you from the Ping announcement alert role, and stop alerting you when an announcemnet comes in',
                    ' ',
                    'Use m!pingsub to resubscribe to the announcement alert',
                ]
                if (args[0] == undefined || args[0].toLowerCase() !== 'staff') {
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
                                name: `${prefix_GamingInc}help`,
                                value: help_help.join('\n'),
                            },
                            {
                                name: `${prefix_GamingInc}rickroll`,
                                value: help_rickroll.join('\n'),
                            },
                            {
                                name: `${prefix_GamingInc}lyrics [-Song]`,
                                value: help_lyrics.join('\n'),
                            },
                            {
                                name: `${prefix_GamingInc}pingsub`,
                                value: help_pingsub.join('\n'),
                            },
                            {
                                name: `${prefix_GamingInc}pingunsub`,
                                value: help_pingunsub.join('\n'),
                            },
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: '©mklprudence',
                            icon_url: client.user.avatarURL,
                        },
                    } });
                }
                else if (args[0].toLowerCase() == 'staff') {
                    message.channel.send({ embed: {
                        color: 16514816,
                        title: 'MKLBot Staff Command Help',
                        description: description_staff.join('\n'),
                        fields: [
                            {
                                name: `${prefix_GamingInc}login [-PlayerMention] [-Staff]  (ADMIN+)`,
                                value: help_login.join('\n'),
                            },
                            {
                                name: `${prefix_GamingInc}removereaction [-MsgID] [-Emoji]  (Admin+)`,
                                value: help_removereaction.join('\n'),
                            },
                            {
                                name: `${prefix_GamingInc}userinfo [-UserKey]  (Admin+)`,
                                value: help_userinfo.join('\n'),
                            },
                            {
                                name: `${prefix_GamingInc}alladdrole [-RoleMention]`,
                                value: help_alladdrole.join('\n'),
                            },
                            {
                                name: `${prefix_GamingInc}help Staff`,
                                value: 'Display this Staff command list.\n\n\n.',
                            }
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: '©mklprudence',
                            icon_url: client.user.avatarURL,
                        },
                    } });
                }
            }
            else if (cmd == 'removereaction') {
                if (isAdmin) {
                    message.channel.fetchMessage(args[0])
                        .then(function(msg) {
                            msg.reactions.get(args[1]).fetchUsers().then(
                                users => users.forEach(val => msg.reactions.get(args[1]).remove(val))
                            )
                            .catch(console.error);
                            message.channel.send(`Reaction ${args[1]} Removed from message ${args[0]}`);
                        })
                        .catch(console.error);
                }
                else{
                    message.channel.send('Sorry ' + message.author.username + ', You do not have permission to do so');
                }
            }
            else if (cmd == 'alladdrole') {
                if (isHA) {
                    var rolemention = message.mentions.roles.first();
                    if(!rolemention) {
                        return message.channel.send('Please mention a role in the command');
                    }
                    message.guild.fetchMembers()
                        .then(async function(guild) {
                            for(let member of guild.members.filter(val => !val.user.bot).values()) {
                                await member.addRole(rolemention).catch(console.error);
                            }
                        })
                        .then(message.channel.send(`all human member added to ${rolemention.name}`))
                        .catch(console.error);
                }
            }
            else if (cmd == 'lyrics') {
                if (args[0].toLowerCase() == 'sou' || 'shape of you') {
                    if (message.author.id == 377157652880293888 || message.author.id == 266401880362450944) {
                        message.channel.send({ embed: {
                            color: 16514816,
                            title: 'Shape of You Lyrics',
                            fields: [
                                {
                                    name: 'Shape of You by Ed Sheeran',
                                    value: lyrics_SOU.join('\n'),
                                },
                            ],
                            timestamp: new Date(),
                            footer: {
                                text: '©mklprudence',
                                icon_url: client.user.avatarURL,
                            },
                        } });
                        message.channel.send({ embed: {
                            color: 16514816,
                            title: 'Shape of You Lyrics',
                            fields: [
                                {
                                    name: 'Shape of You by Ed Sheeran',
                                    value: lyrics_SOU1.join('\n'),
                                },
                            ],
                            timestamp: new Date(),
                            footer: {
                                text: '©mklprudence',
                                icon_url: client.user.avatarURL,
                            },
                        } });
                        message.channel.send({ embed: {
                            color: 16514816,
                            title: 'Shape of You Lyrics',
                            fields: [
                                {
                                    name: 'Shape of You by Ed Sheeran',
                                    value: lyrics_SOU2.join('\n'),
                                },
                            ],
                            timestamp: new Date(),
                            footer: {
                                text: '©mklprudence',
                                icon_url: client.user.avatarURL,
                            },
                        } });
                        message.channel.send({ embed: {
                            color: 16514816,
                            title: 'Shape of You Lyrics',
                            fields: [
                                {
                                    name: 'Shape of You by Ed Sheeran',
                                    value: lyrics_SOU3.join('\n'),
                                },
                            ],
                            timestamp: new Date(),
                            footer: {
                                text: '©mklprudence',
                                icon_url: client.user.avatarURL,
                            },
                        } });
                    }
                    else {
                        message.channel.send('Sorry only JackIsBeast#0653 can access this command');
                    }
                }
            }
            else if (cmd == 'rickroll') {
                if (message.author.id == 280678895714435072 || isAdmin) {
                    message.channel.send('Custom Command Giveaway #1, won by <@280678895714435072>, 26 Apr 2018');
                    message.channel.send('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                }
                else {
                    message.channel.send('You don\'t have permission to do this!!!');
                    message.channel.send(`Custom Command Giveaway #1, won by ${message.guild.members.get(280678895714435072).user.username}, 26 Apr 2018`);
                    message.channel.send(`Command only accessable by ${message.guild.members.get(280678895714435072).user.username}`);
                }
            }
            else if (cmd == 'pingunsub') {
                message.member.removeRole('440532819958169601');
                message.channel.send(`Removed <@${message.author.id}> from the Ping role`);
            }
            else if (cmd == 'pingsub') {
                message.member.addRole('440532819958169601');
                message.channel.send(`Added <@${message.author.id}> to the Ping role`);
            }
            else if (cmd == 'userinfo') {
                if (isAdmin) {
                    let target;
                    if (message.mentions.members.first()) {
                        target = message.mentions.members.first() || message.member;
                    }
                    else if (Number.isInteger(Number(args[0]))) {
                        target = message.guild.members.get(args[0]) || message.member;
                    }
                    else {
                        target = message.guild.members.find('nickname', args.join(' ')) || message.guild.members.find(val => val.user.username == args.join(' ')) || message.member;
                    }
                    message.channel.send({ embed: {
                        color: 16514816,
                        title: `User Info of ${target.user.username}`,
                        description: `User Information Query by <@${message.author.id}>`,
                        fields: [
                            {
                                name: 'Basic Info',
                                value: [
                                    `Username: ${target.user.username}`,
                                    `ID: ${target.id}`,
                                    `Tag: ${target.user.tag}`,
                                ].join('\n'),
                            },
                            {
                                name: 'Server Info',
                                value: [
                                    `Join Time: ${target.joinedAt}`,
                                    `Nickname: ${target.nickname}`,
                                    `Status: ${target.presence.status}`,
                                    `Game Playing: ${target.presence.game ? target.presence.game.name || 'No Game Playing' : 'No Game Playing'}`,
                                    `Stream URL: ${target.presence.game ? target.presence.game.url || 'Not Streaming' : 'Not Streaming'}`,
                                    `Activity Type: ${target.presence.game ? target.presence.game.type || 'No Activity' : 'No Activity'}`,
                                ].join('\n'),
                            },
                            {
                                name: 'Roles',
                                value: target.roles.sort((a, b) => b.comparePositionTo(a)).map(roles => roles.name).join('\n'),
                            },
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: '©mklprudence',
                            icon_url: client.user.avatarURL,
                        },
                    } });
                }
                else {
                    message.channel.send('Sorry, you don\'t have the permission to do this');
                }
            }
            else if (cmd == 'useredit') {
                let target;
                if (Number.isInteger(Number(args[0]))) {
                    if (message.guild.members.get(args[0])) {
                        target = message.guild.members.get(args[0]);
                    }
                    else {
                        message.channel.send('Cannot retrieve Guildmember');
                    }
                }
                else {
                    return message.channel.send('Input valid Integral UserID').then(msg => msg.delete(10000));
                }
                if (args[1].toLowerCase() == 'nickname') {
                    if (args.slice(2)) {
                        target.setNickname(args.slice(2).join(' '));
                    }
                    else {
                        return message.channel.send('Input valid nickname').then(msg => msg.delete(10000));
                    }
                }
                else if (args[1].toLowerCase() == 'role' || args[1].toLowerCase() == 'roles') {
                    let targetrole;
                    if (message.mentions.roles.first()) {
                        targetrole = message.mentions.roles.first();
                    }
                    else if (message.guild.roles.find('name', args.slice(2).join(' '))) {
                        targetrole = message.guild.roles.find('name', args.slice(2).join(' '));
                    }
                    else {
                        return message.channel.send('Cannot find role').then(msg => msg.delete(10000));
                    }
                    if (target.roles.has(targetrole.id)) {
                        target.removeRole(targetrole);
                    }
                    else {
                        target.addRole(targetrole);
                    }
                }
            }
            else if (cmd == 'servertransfer') {
                if (isAdmin) {
                    if (args[0] == 'rolelist') {
                        message.channel.send('Role List in old Gaming Inc. Server');
                        client.guilds.get('423877278510874644').fetchMembers()
                            .then(function(guild) {
                                for(let member of guild.members.values()) {
                                    message.channel.send(`**${member.user.username}:**\n${member.roles.map(role => role.name).join('\n')}`);
                                }
                            });
                    }
                }
                else {
                    message.channel.send('Sorry you have no permission to do so');
                }
            }
            else if (cmd == 'updaterss') {
                if (isAdmin) {
                    RSS();
                    message.channel.send('Updating RSS');
                }
            }
            else if (cmd == 'archivejira' || cmd == 'jiraarchive') {
                if (isHA) {
                    if (message.channel.id == '439935281647583248') {
                        message.channel.fetchMessage(args[0])
                            .then(function(msg) {
                                client.channels.get('442745963824676886').send(msg.content);
                                msg.delete(1000);
                            })
                            .catch(console.error);
                    }
                    else {
                        message.channel.send('Please do it in <#439935281647583248>').then(msg => client.setTimeout(function(){msg.delete()}, 20000));
                    }
                }
                else {
                    message.channel.send('You dont have permission to do so').then(msg => client.setTimeout(function(){msg.delete()}, 20000));
                }
                message.delete();
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

client.on('guildMemberUpdate', (oldMember, newMember) => {
    if (!oldMember.roles.equals(newMember.roles.equals) && newMember.guild.id == '439736642392162316') {
        RSS(newMember);
    }
});

process.on('unhandledRejection', err => console.error(`Uncaught Promise Rejection: \n${err.stack}`));

function RSS(member) {
    if (!member) {
        client.channels.get('440538596500307968').send('Updating RSS!');
        client.guilds.get('439736642392162316').fetchMembers()
            .then(async function(guild) {
                for(let member of guild.members.filter(val => !val.user.bot).values()) {
                    for(let i = 0; i < 6; i++) {
                        if (!member.roles.filter(a => (guild.roles.get(RSSrolelist[i]).position > a.position && a.position > guild.roles.get(RSSrolelist[i + 1]).position)).first()) {
                            await member.removeRole(RSSrolelist[i]).catch(console.error);
                        }
                        else {
                            await member.addRole(RSSrolelist[i]).catch(console.error);
                        }
                    }
                }
            })
            .catch(console.error);
    }
    else if (!member.user.bot) {
        // updated still not working but still use sin la
        let updated = false;
        client.guilds.get('439736642392162316').fetchMember(member)
            .then(async function(memberfetched) {
                for(let i = 0; i < RSSrolelist.length - 1; i++) {
                    if (!memberfetched.roles.filter(a => (client.guilds.get('439736642392162316').roles.get(RSSrolelist[i]).position > a.position && a.position > client.guilds.get('439736642392162316').roles.get(RSSrolelist[i + 1]).position)).first()) {
                        await memberfetched.removeRole(RSSrolelist[i]).then(function() {updated = true;}).catch(console.error);
                    }
                    else {
                        await memberfetched.addRole(RSSrolelist[i]).then(function() {updated = true;}).catch(console.error);
                    }
                }
            })
            .catch(console.error);
        if (updated) {
            client.channels.get('440538596500307968').send({ embed: {
                color: 16514816,
                title: `${member.user.tag}`,
                description: `Updating RSS for ${member.user.username}`,
                timestamp: new Date(),
                footer: {
                    text: '©mklprudence',
                    icon_url: client.user.avatarURL,
                },
            } });
        }
    }
}
