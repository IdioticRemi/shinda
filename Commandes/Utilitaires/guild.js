const {
    RichEmbed
} = require('discord.js');
const moment = require('moment');
moment.locale('fr');

exports.run = async (client, message, args) => {
    let guild = message.guild;
    let date = `${guild.createdAt}`.split(' ');
    let newDate = `${date[0]} ${date[2]} ${date[1]} ${date[3]} à ${date[4]}`
    let afkChannel;
    if (!guild.afkChannel) afkChannel = 'Aucun';
    else afkChannel = guild.afkChannel.name;
    let color = 0x32ef51;
    if (guild.members.size > 60) color = 0xff0000;
    else if (guild.members.size > 45) color = 0xff4141;
    else if (guild.members.size > 30) color = 0xfc591e;
    else if (guild.members.size > 15) color = 0xefe832;

    message.channel.send(new RichEmbed()
        .setColor(color)
        .setThumbnail(guild.iconURL)
        .setFooter(moment().format('LLLL'))
        .addField(`Serveur`, `Nom : \`${guild.name}\`\nID : \`${guild.id}\`\nDate de création : \`${newDate}\`\nPropriétaire : \`${guild.owner.user.tag}\``, true)
        .addField(`Autres`, `Channels : \`${guild.channels.size}\`\nMembres : \`${guild.members.size}\`\nChannel AFK : \`${afkChannel}\``, true)
    );
};

exports.config = {
    aliases: ['server', 'guildinfo'],
    permLevel: 0
};

exports.help = {
    name: 'Guild',
    description: 'Voir les informations sur le serveur.',
    usage: 'guild',
    category: 'Utilitaires'
};