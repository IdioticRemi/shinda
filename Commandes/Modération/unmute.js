const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = message.guild.channels.get(client.settings.get(message.guild.id).modlogs);

    if (!logchannel) {
        client.nologs(message);
    } else {
        if (message.mentions.users.size < 1 || raison.length < 1) {
            client.no(message, `Utilisation : **\`${message.prefix}unmute <@utilisateur> <raison>\`**`);
        } else {
            if (client.settings.get(message.guild.id).mutes.includes(cible.id)) {
                if (message.content.includes('--silent') || message.content.includes('-s')) {
                    client.yes(message, `**${cible.tag}** à été unmute de **${message.guild.name}** !`, 3000);
                    message.delete(300);
                } else {
                    client.yes(message, `**${cible.tag}** à été unmute de **${message.guild.name}** !`);
                }
                client.logs(message, 'Unmute', logchannel);
                let index = client.settings.get(message.guild.id).mutes.indexOf(cible.id);
                client.settings.get(message.guild.id).mutes.splice(index, 1);
            } else {
                client.no(message, `**${cible.tag}** n'est pas mute de **${message.guild.name}** !`);
            }
        }
    }
};

exports.config = {
    aliases: ['démute', 'demute', 'cantalk'],
    permLevel: 2
};

exports.help = {
    name: 'unMute',
    description: 'unMute un utilisateur pour une certaine raison.',
    usage: 'unmute <@utilisateur> [--silent]',
    category: 'Modération'
};