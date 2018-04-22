exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id != `350710888812249101`) return client.no(message, `Tu n'a pas la permission **Administrateur**`);
    }
    if (!args[0] || args[0].toLowerCase() != 'true' && args[0].toLowerCase() != 'false') {
        client.no(message, `Utilisation : **\`${message.prefix}expmention <true|false>\`**`);
    } else {
        if (args[0] == 'true') {
            client.writeSettings(message.guild.id, {
                mention: true
            });
            client.yes(message, `Désormais, quand quelqu'un monte d'un niveau, il sera mentionné !`);
        } else {
            client.writeSettings(message.guild.id, {
                mention: false
            });
            client.yes(message, `Désormais, quand quelqu'un monte d'un niveau, il ne sera pas mentionné !`);
        }
    }
};

exports.config = {
    aliases: ['lvlmention', 'mentionexp', 'mentionlvl', 'pingonlevelup'],
    permLevel: 0
};

exports.help = {
    name: 'ExpMention',
    description: 'Définir si quand qqn level up, il est mentionné ou pas.',
    usage: 'expmention <true|false>',
    category: 'Administration'
};