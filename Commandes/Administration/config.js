const {
    RichEmbed
} = require('discord.js');

exports.run = async (client, message, args) => {
    let embed = new RichEmbed().setDescription(`**Configuration du bot sur : ${message.guild.name}**\n`);
    let guild = message.guild.id;

    let prefix = client.settings.get(guild).prefix;
    let join = client.settings.get(guild).welcome.join;
    let leave = client.settings.get(guild).welcome.leave;
    let welcome = client.settings.get(guild).welcome.channel;
    let auto = client.settings.get(guild).welcome.autorole;
    let logs = client.settings.get(guild).modlogs;
    let perm2 = client.settings.get(guild).perms.mod;
    let perm3 = client.settings.get(guild).perms.admin;
    let perm4 = client.settings.get(guild).perms.owner;

    welcome = message.guild.channels.get(welcome);
    logs = message.guild.channels.get(logs);

    auto = message.guild.roles.get(auto);
    perm2 = message.guild.roles.get(perm2);
    perm3 = message.guild.roles.get(perm3);
    perm4 = message.guild.roles.get(perm4);

    let i = 0;
    if (!join) {
        join = `\`Indéfini\``;
        i++;
    }
    if (!leave) {
        leave = `\`Indéfini\``;
        i++;
    }
    if (!welcome) {
        welcome = `\`Indéfini\``;
        i++;
    }
    if (!auto) {
        auto = `\`Indéfini\``;
        i++;
    }
    if (!logs) {
        logs = `\`Indéfini\``;
        i++;
    }
    if (!perm2) {
        perm2 = `\`Indéfini\``;
        i++;
    }
    if (!perm3) {
        perm3 = `\`Indéfini\``;
        i++;
    }
    if (!perm4) {
        perm4 = `\`Indéfini\``;
        i++;
    }

    let color = 0x00ff0c;
    if (i == 8) color = 0xff0000;
    else if (i == 6 || i == 7) color = 0xff4141;
    else if (i == 4 || i == 5) color = 0xfc591e;
    else if (i == 2 || i == 3) color = 0xefe832;
    else if (i == 1) color = 0x32ef51;

    embed.addField(`Bienvenue`, `Channel des messages : ${welcome}\nMessage (Join): \`${join}\`\nMessage (Leave) : \`${leave}\`\nAutoRôle : ${auto}`, true);
    embed.addField(`Permissions`, `Modérateur [2] : ${perm2}\nAdministrateur [3] : ${perm3}\nFondateur [4] : ${perm4}`, true);
    embed.addField(`Utilitaires`, `Préfixe : \`${prefix}\``, true);
    embed.addField(`Modération`, `Channel des logs : ${logs}`, true);
    embed.setColor(color);

    message.channel.send(embed);
}

exports.config = {
    aliases: ['cfg', 'getcfg', 'getconfig'],
    permLevel: 4
};

exports.help = {
    name: 'Config',
    description: 'Voir la configuration du bot sur votre serveur.',
    usage: 'config',
    cat: 'Administration'
};