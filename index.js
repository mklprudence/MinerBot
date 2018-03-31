// setup objects
const config = require('./config.json');
const Sequelize = require('sequelize');

// setup global variables
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

// define Sequelize connection
const sequelize = new Sequelize('database', 'sql12229851', 'XnBWZXbMZ7', {
    host: 'sql12.freemysqlhosting.net',
    dialect: 'mysql',
    logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// create table 'tags'
const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    // console.log('Ready!');
});

client.once('ready', () => {
    Tags.sync();
});

// login to Discord with your app's token
client.login(config.token);

client.on('message', async message => {

    // Miner's Clan
    if (message.guild.id == '417584740758061056' || simServer == 417584740758061056) {
        if (message.content.substring(0, prefix_MinerClan.length) == prefix_MinerClan) {
            let args = message.content.substring(prefix_MinerClan.length).split(' ');
            let cmd = args[0];
            let isdev = adminlist_MinerClan.includes(message.author.id);

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
                case 'pokemon':
                    if (args[0] == 'initiate') {
                        message.channel.send('/start');
                        setTimeout(function() {message.channel.send('/pick Charmander');}, 1000);
                    }
                    break;
                case 'addtag':
                    try{
                        const tag = await Tags.create({
                            name: args[0],
                            description: args[1],
                            username: message.author.username,
                        });
                        return message.reply(`Tag ${tag.name} added.`);
                    }
                    catch (e) {
                        if (e.name === 'SequelizeUniqueConstraintError') {
                            return message.reply('That tag already exists.');
                        }
                        return message.reply('Something went wrong with adding a tag.');
                    }
                    break;
                case 'tag':
                    const tag = await Tags.findOne({where: { name: args[0]} });
                    if (tag) {
                        tag.increment('usage_count');
                        return message.channel.send(tag.get('description'));
                    }
                    return message.reply(`Could not find tag ${args[0]}`);
                    break;
                case 'edittag':
                    const affectedRows = await Tags.update({ description: args[1] }, { where: { name: args[0] } });
                    if (affectedRows > 0) {
                        return message.reply(`Tag ${args[0]} was edited.`);
                    }
                    return message.reply(`Could not find a tag with name ${args[0]}.`);
                    break;
                case 'taginfo':
                    const taga = await Tags.findOne({ where: { name: args[0] } });
                    if (taga) {
                        return message.channel.send(`${args[0]} was created by ${taga.username} at ${taga.createdAt} and has been used ${taga.usage_count} times.`);
                    }
                    return message.reply(`Could not find tag: ${args[0]}`);
                    break;
                case 'showtags':
                    const tagList = await Tags.findAll({ attributes: ['name'] });
                    const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
                    return message.channel.send(`List of tags: ${tagString}`);
                    break;
                case 'removetag':
                    const rowCount = await Tags.destroy({ where: { name: args[0] } });
                    if (!rowCount) return message.reply('That tag did not exist.');
                    
                    return message.reply('Tag deleted.');
                    break;
            }
        }
    }

    // P&R dev Server
    if (message.guild.id == '275235526330810369') {
        if (message.content.substring(0, prefix_PR.length) == prefix_PR) {
            let args = message.content.substring(prefix_PR.length).split(' ');
            let cmd = args[0];
            let isdev = adminlist_PR.includes(message.author.id);

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
    if (message.guild.id == '423877278510874644' || simServer == 423877278510874644) {
        if (message.content.substring(0, prefix_GamingInc.length) == prefix_GamingInc) {
            let args = message.content.substring(prefix_GamingInc.length).split(' ');
            let cmd = args[0];
            let isdev = adminlist_GamingInc.includes(message.author.id);

            // cut out args[0] the cmd
            args = args.splice(1);

            switch (cmd){
                case 'ping':
                    if (true) {
                        message.channel.send('The Bot Ping: ' + client.ping);
                        message.channel.send('The Bot Uptime: ' + client.uptime);
                    }
                    else{
                        message.channel.send('Sorry ' + message.author.username + ', You do not have permission to do so');
                    }
                    break;
            }
        }
    }
});
