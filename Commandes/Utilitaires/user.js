const {
    RichEmbed
} = require('discord.js');
const moment = require('moment');
moment.locale('fr');

exports.run = async (client, message, args) => {
    let user;

    if (!message.mentions.users.first()) user = message.author;
    else user = message.mentions.users.first();

    let date = `${user.createdAt}`.split(' ');
    let newDate = `${date[0]} ${date[2]} ${date[1]} ${date[3]} à ${date[4]}`
    let isNitro = user.premium;
    if (!isNitro) isNitro = 'Non';
    else isNitro = 'Oui';
    let status = user.presence.status;
    let color;
    let game;
    if (!user.presence.game) game = 'Aucun jeu'
    else game = user.presence.game.name;
    if (status == 'online') {
        color = 0x56f441;
        status = 'En ligne';
    } else if (status == 'dnd') {
        color = 0xff4141;
        status = 'Ne pas déranger';
    } else if (status == 'idle') {
        color = 0xff7d32;
        status = 'Inactif';
    } else {
        status = 'Absent';
    }

    message.channel.send(new RichEmbed()
        .setColor(color)
        .setThumbnail(user.avatarURL)
        .setFooter(moment().format('LLLL'))
        .addField(`Compte`, `Pseudo : \`${user.username}\`\nTag : \`#${user.discriminator}\`\nDate de création : \`${newDate}\`\nNitro : \`${isNitro}\``, true)
        .addField(`Autres`, `Jeu : \`${game}\`\nID : \`${user.id}\`\nStatus : \`${status}\``, true)
    );
};

exports.config = {
    aliases: ['usr', 'userinfo'],
    permLevel: 0
};

exports.help = {
    name: 'User',
    description: 'Voir les informations sur un utilisateur.',
    usage: 'user [@Utilisateur]',
    category: 'Utilitaires'
};