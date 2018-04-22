const {
    RichEmbed
} = require('discord.js');

const arraySort = require('array-sort');
const table = require('table');
const send = require('quick.hook');

exports.run = async (client, message, args) => {

    let invites = client.exp.array().filter(v => v.guild == message.guild.id);

    arraySort(invites, 'exp', {
        reverse: true
    });

    if (invites.length > 8) {
        invites = invites.slice(0, 8);
    }

    let possibleExp = [
        ['#', 'Utilisateur', 'Niveau', 'Exp']
    ];
    let i = 1;

    invites.forEach(invite => {
        possibleExp.push([i, invite.user, invite.level, invite.exp]);
        i++;
    });

    let embed = new RichEmbed()
        .setColor(0xf44141)

    if (message.guild.member(client.user).hasPermission("MANAGE_WEBHOOKS")) {
        embed.addField(`Leaderboard`, `\`\`\`${table.table(possibleExp)}\`\`\``);
        send(message.channel, embed, {
            name: 'Classement de l\'exp',
            icon: 'https://www.mentormint.com/assets/img/icons/career-coaching.png'
        });
    } else {
        embed.setAuthor('Classement de l\'exp', 'https://www.mentormint.com/assets/img/icons/career-coaching.png');
        embed.setDescription(`\`\`\`${table.table(possibleExp)}\`\`\``);
        message.channel.send(embed);
    }
};

exports.config = {
    aliases: ['expleaderboard'],
    permLevel: 0
};

exports.help = {
    name: 'ExpLB',
    description: 'Voir les personnes qui ont le plus d\'exp sur le serveur.',
    usage: 'explb',
    category: 'Fun'
};