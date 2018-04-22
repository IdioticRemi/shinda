const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = message.guild.channels.get(client.settings.get(message.guild.id).modlogs);

    if (!logchannel) {
        client.nologs(message)
    } else {
        if (message.mentions.users.size < 1 || raison.length < 1) {
            client.no(message, `Utilisation : **\`${message.prefix}kick <@utilisateur> <raison> [--silent]\`**`);
        } else {
            if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
                client.no(message, `Je n'ai pas la permission de **kick les membres du serveur** !`);
            } else {
                if (!message.guild.member(cible).kickable) {
                    client.no(message, `Je n'ai pas la permission d'expulser **\`${cible.tag}\`** !`);
                } else {
                    if (message.content.includes('--silent') || message.content.includes('-s')) {
                        client.yes(message, `**${cible.tag}** à été kick de **${message.guild.name}** !`, 3000);
                        message.delete(300);
                    } else {
                        client.yes(message, `**${cible.tag}** à été kick de **${message.guild.name}** !`);
                    }
                    client.logs(message, 'Expulsion', logchannel);
                    message.guild.member(cible).kick();
                }
            }
        }
    }
};

exports.config = {
    aliases: ['kk', 'expulse'],
    permLevel: 3
};

exports.help = {
    name: 'Kick',
    description: 'Expulser un utilisateur du serveur pour une certaine raison.',
    usage: 'kick <@utilisateur> <raison> [--silent]',
    cat: 'Modération'
};