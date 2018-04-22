exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id != `350710888812249101`) return client.no(message, `Tu n'a pas la permission **Administrateur**`);
    }
    if (!args[0]) {
        client.no(message, `Utilisation : **\`${message.prefix}setjoin <message>\`**`);
    } else {
        const settings = client.settings.get(message.guild.id);
        settings.welcome.join = args.join(' ');
        client.settings.set(message.guild.id, settings);
        client.yes(message, `Le message de bienvenue de cette guilde à été changé : \n\n${args.join(' ')}`);
    }
};

exports.config = {
    aliases: ['setjoinmsg', 'join', 'setjoinmessage'],
    permLevel: 0
};

exports.help = {
    name: 'SetJoin',
    description: 'Changer le message de bienvenue.',
    usage: 'setjoin <message>',
    cat: 'Administration'
};