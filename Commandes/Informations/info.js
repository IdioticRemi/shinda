const Discord = require('discord.js');
const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
moment.locale('fr');

exports.run = async (client, message, args) => {
    let embed = new Discord.RichEmbed();
    let duration = moment.duration(client.uptime).format(' D [j], H [h], m [min], s [sec]');
    let ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    let color = 0x32ef51;
    if (ram > 75) color = 0xff0000;
    else if (ram > 60) color = 0xff4141;
    else if (ram > 45) color = 0xfc591e;
    else if (ram > 30) color = 0xefe832;
    
    embed.setColor(color);
    embed.setAuthor(client.user.username, client.user.avatarURL);
    embed.setThumbnail(client.user.avatarURL);
    embed.addField(`Préfixe`, `**Préfixe par défaut : \`-\`\nPréfixe customisé : \`${client.settings.get(message.guild.id).prefix}\`**`, true)
    embed.addField(`Hébergement`, `**RAM Utilisée : \`${ram} MB\`\nUptime : \`${duration}\`\nVersion Discord.js : \`${version}\`\nVersion Node.js : \`${process.version}\`\nPing : \`${Math.floor(client.ping)} ms\`**`, true);
    embed.addField(`Communauté`, `**Guildes : \`${client.guilds.size}\`\nChannels : \`${client.channels.size}\`\nUtilisateurs : \`${client.users.size}\`**`, true);
    message.channel.send(embed);
};

exports.config = {
    aliases: ['infos', 'stats'],
    permLevel: 0
};

exports.help = {
    name: 'Info',
    description: 'Voir les informations d\'hébergement et de communauté du bot.',
    usage: 'info',
    cat: 'Informations'
};