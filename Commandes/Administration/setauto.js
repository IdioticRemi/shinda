exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id != `350710888812249101`) return client.no(message, `Tu n'a pas la permission **Administrateur**`);
    }
    if (!message.mentions.roles.first()) {
        client.no(message, `Utilisation : **\`${message.prefix}setauto <message>\`**`);
    } else {
        const settings = client.settings.get(message.guild.id);
        settings.welcome.autorole = message.mentions.roles.first().id;
        client.settings.set(message.guild.id, settings);
        client.yes(message, `Le rôle de bienvenue de cette guilde à été changé : **\`${message.mentions.roles.first().name}\`**`);
    }
};

exports.config = {
    aliases: ['setautorole', 'setjoinrole', 'auto', 'autorole'],
    permLevel: 0
};

exports.help = {
    name: 'SetAuto',
    description: 'Changer le role donné à un nouveau sur le serveur.',
    usage: 'setauto <@role>',
    cat: 'Administration'
};