exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id != `350710888812249101`) return client.no(message, `Tu n'a pas la permission **Administrateur**`);
    }
        if (!args[0] || args.length > 1) {
            client.no(message, `Utilisation : **\`${message.prefix}setprefix <prefixe>\`**`);
        } else {
            client.writeSettings(message.guild.id, { prefix: args[0] });
            client.yes(message, `Le préfixe du bot à été changé en **\`${args[0]}\`**`);
        }
    
};

exports.config = {
    aliases: ['sp', 'setp', 'sprefix', 'prefix'],
    permLevel: 0
};

exports.help = {
    name: 'SetPrefix',
    description: 'Changer le préfixe du bot.',
    usage: 'prefix <prefixe>',
    category: 'Administration'
};