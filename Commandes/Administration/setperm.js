exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id != `350710888812249101`) return client.no(message, `Tu n'a pas la permission **Administrateur**`);
    }
    if (!args[0] || !isNaN(args[0]) || args[0].toLowerCase() != "mod" && args[0].toLowerCase() != "admin" && args[0].toLowerCase() != "owner" || !message.mentions.roles.first()) {
        client.no(message, `Utilisation : **\`${message.prefix}setpermrole <Mod|Admin|Owner> <@role>\`** !`);
    } else {
        const settings = client.settings.get(message.guild.id);
        switch (args[0].toLowerCase()) {
            case 'mod':
                settings.perms.mod = message.mentions.roles.first().id;
                break;
            case 'admin':
                settings.perms.admin = message.mentions.roles.first().id;
                break;
            case 'owner':
                settings.perms.owner = message.mentions.roles.first().id;
                break;
        }
        client.settings.set(message.guild.id, settings);
        client.yes(message, `La permission **${args[0]}** a été définie sur le role **\`${message.mentions.roles.first().name}\`** !`);
    }
};

exports.config = {
    aliases: ['setperms', 'setpermrole', 'perm'],
    permLevel: 0
};

exports.help = {
    name: 'SetPerm',
    description: 'Changer les roles des permissions.',
    usage: 'setperm <Mod|Admin|Owner> <@role>',
    cat: 'Administration'
};