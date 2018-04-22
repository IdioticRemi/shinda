const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = message.guild.channels.get(client.settings.get(message.guild.id).modlogs);

    if (!logchannel) {
        client.nologs(message)
    } else {
        if (message.mentions.users.size < 1 || raison.length < 1) {
            client.no(message, `Utilisation : **\`${message.prefix}ban <@utilisateur> <raison> [--silent]\`**`);
        } else {
            if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
                client.no(message, `Je n'ai pas la permission de **bannir les membres du serveur** !`);
            } else {
                if (!message.guild.member(cible).bannable) {
                    client.no(message, `Je n'ai pas la permission de bannir **\`${cible.tag}\`** !`);
                } else {
                    if (message.content.includes('--silent') || message.content.includes('-s')) {
                        client.yes(message, `**${cible.tag}** à été banni de **${cible.tag}** !`, 3000);
                        message.delete(300);
                    } else {
                        client.yes(message, `**${cible.tag}** à été banni de **${cible.tag}** !`);
                    }
                    client.logs(message, 'Bannissement', logchannel);
                    message.guild.ban(cible);
                }
            }
        }
    }
};

exports.config = {
    aliases: ['lban', 'lifeban'],
    permLevel: 3
};

exports.help = {
    name: 'Ban',
    description: 'Bannir un utilisateur du serveur pour une certaine raison.',
    usage: 'ban <@utilisateur> <raison> [--silent]',
    category: 'Modération'
};