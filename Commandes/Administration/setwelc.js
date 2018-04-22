exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id != `350710888812249101`) return client.no(message, `Tu n'a pas la permission **Administrateur**`);
    }
    if (!args[0] || !message.mentions.channels.first()) {
        client.no(message, `Utilisation : **\`${message.prefix}setwelc <#channel>\`**`);
    } else {
        const settings = client.settings.get(message.guild.id);
        settings.welcome.channel = message.mentions.channels.first().id;
        client.settings.set(message.guild.id, settings);
        client.yes(message, `Le channel de bienvenue à été changé en **\`#${message.mentions.channels.first().name}\`**`);
    }
};

exports.config = {
    aliases: ['welcome', 'welc', 'setwelcome'],
    permLevel: 0
};

exports.help = {
    name: 'SetWelc',
    description: 'Changer le channel des messages de join/leave.',
    usage: 'setwelc <#channel>',
    category: 'Administration'
};