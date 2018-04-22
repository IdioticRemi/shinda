const {
    RichEmbed
} = require('discord.js');

const arraySort = require('array-sort');
const table = require('table');
const send = require('quick.hook');

exports.run = async (client, message, args) => {
    let invites = await message.guild.fetchInvites().catch(e => {
        client.no(message, `Je n'ai pas la permission de **voir les invitations** !`);
    });

    invites = invites.array();
    
    if (invites.length < 1) {
        return client.no(message, 'Je n\'ai trouvé **aucune invitation** !');
    }
    
    arraySort(invites, 'uses', {
        reverse: true
    });

    if (invites.length > 8) {
        invites = invites.slice(0, 8);
    }


    let possibleInvites = [
        ['#', 'Utilisateur', 'Invités']
    ];
    let i = 1;

    invites.forEach(invite => {
        possibleInvites.push([i, invite.inviter.username, invite.uses]);
        i++;
    });

    let embed = new RichEmbed()
        .setColor(0xf44141)

    if (message.guild.member(client.user).hasPermission("MANAGE_WEBHOOKS")) {
        embed.addField(`Leaderboard`, `\`\`\`${table.table(possibleInvites)}\`\`\``);
        send(message.channel, embed, {
            name: 'Classement des Invitations',
            icon: 'https://www.mentormint.com/assets/img/icons/career-coaching.png'
        });
    } else {
        embed.setAuthor('Classement des Invitations', 'https://www.mentormint.com/assets/img/icons/career-coaching.png');
        embed.setDescription(`\`\`\`${table.table(possibleInvites)}\`\`\``);
        message.channel.send(embed);
    }
};

exports.config = {
    aliases: ['leaderboard', 'lb', 'invitelb'],
    permLevel: 0
};

exports.help = {
    name: 'Invites',
    description: 'Voir les personnes qui ont invité le plus de personnes sur le serveur.',
    usage: 'invites',
    category: 'Utilitaires'
};