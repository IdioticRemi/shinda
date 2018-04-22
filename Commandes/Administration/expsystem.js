exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id != `350710888812249101`) return client.no(message, `Tu n'a pas la permission **Administrateur**`);
    }
    if (!args[0] || args[0].toLowerCase() != 'true' && args[0].toLowerCase() != 'false') {
        client.no(message, `Utilisation : **\`${message.prefix}expsystem <true|false>\`**`);
    } else {
        if (args[0] == 'true') {
            client.writeSettings(message.guild.id, {
                expsystem: true
            });
            client.yes(message, `Le système d'experience à été activé sur votre serveur !`);
        } else {
            client.writeSettings(message.guild.id, {
                expsystem: false
            });
            client.yes(message, `Le système d'experience à été désactivé sur votre serveur !`);
        }
    }

};

exports.config = {
    aliases: ['expsys', 'sysexp', 'setexp'],
    permLevel: 0
};

exports.help = {
    name: 'ExpSystem',
    description: 'Désactiver / Activer le système d\'experience.',
    usage: 'expsystem <true|false>',
    category: 'Administration'
};