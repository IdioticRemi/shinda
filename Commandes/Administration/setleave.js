exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id != `350710888812249101`) return client.no(message, `Tu n'a pas la permission **Administrateur**`);
    }
    if (!args[0]) {
        client.no(message, `Utilisation : **\`${message.prefix}setleave <message>\`**`);
    } else {
        const settings = client.settings.get(message.guild.id);
        settings.welcome.leave = args.join(' ');
        client.settings.set(message.guild.id, settings);
        client.yes(message, `Le message d'au revoir de cette guilde à été changé : \n\n${args.join(' ')}`);
    }
};

exports.config = {
    aliases: ['setleavemsg', 'leave', 'setleavemessage'],
    permLevel: 0
};

exports.help = {
    name: 'SetLeave',
    description: 'Changer le message quand quelqu\'un quitte le serveur.',
    usage: 'setleave <message>',
    cat: 'Administration'
};