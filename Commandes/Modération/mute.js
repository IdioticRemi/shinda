const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = message.guild.channels.get(client.settings.get(message.guild.id).modlogs);

    if (!logchannel) {
        client.nologs(message);
    } else {
        if (message.mentions.users.size < 1 || raison.length < 1) {
            client.no(message, `Utilisation : **\`${message.prefix}mute <@utilisateur> <raison> [--silent]\`**`);
        } else {
            if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) {
                client.no(message, `Je n'ai pas la permission de gerer les messages du chat !`);
            } else {
                if (!client.settings.get(message.guild.id).mutes.includes(cible.id)) {
                    if (message.content.includes('--silent') || message.content.includes('-s')) {
                        client.yes(message, `**${cible.tag}** à été mute de **${message.guild.name}** !`, 3000);
                        message.delete(300);
                    } else {
                        client.yes(message, `**${cible.tag}** à été mute de **${message.guild.name}** !`);
                    }
                    client.logs(message, 'Mute', logchannel);
                    client.settings.get(message.guild.id).mutes.push(cible.id);

                } else {
                    client.no(message, `**${cible.tag}** est déja mute de **${message.guild.name}** !`);
                }
            }
        }

    }
};

exports.config = {
    aliases: ['silent', 'mute!', 'shutup'],
    permLevel: 2
};

exports.help = {
    name: 'Mute',
    description: 'Mute un utilisateur pour une certaine raison.',
    usage: 'mute <@utilisateur> [--silent]',
    category: 'Modération'
};