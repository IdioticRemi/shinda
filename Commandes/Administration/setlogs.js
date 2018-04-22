exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id != `350710888812249101`) return client.no(message, `Tu n'a pas la permission **Administrateur**`);
    }
    if (!args[0] || !message.mentions.channels.first().id) {
        client.no(message, `Utilisation : **\`${message.prefix}setlogs <#channel>\`**`);
    } else {
        client.writeSettings(message.guild.id, {
            modlogs: message.mentions.channels.first().id
        });
        client.yes(message, `Le channel des logs de modération à été changé en **\`#${message.mentions.channels.first().name}\`**`);
    }
};

exports.config = {
    aliases: ['setlogchannel', 'setlog', 'logs'],
    permLevel: 0
};

exports.help = {
    name: 'SetLogs',
    description: 'Changer le channel des logs du bot.',
    usage: 'setlogs <#channel>',
    category: 'Administration'
};