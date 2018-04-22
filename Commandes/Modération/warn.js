exports.run = async (client, message, args) => {
    let raison = args.splice(1).join(' ');
    let cible = message.mentions.users.first();
    let logchannel = message.guild.channels.get(client.settings.get(message.guild.id).modlogs);

    if (!logchannel) return client.nologs(message);
    if (!cible || raison.length < 1) return client.no(message, `Utilisation : **\`${message.prefix}warn <@Utilisateur> <raison>\`**`)
    if (permlevel(message, cible) >= 3) return client.no(message, `Vous ne pouvez pas warn cette personne !`);

    if (message.content.includes('--silent') || message.content.includes('-s')) {
        client.yes(message, `**${cible.tag}** à été warn sur **${message.guild.name}** !`, 3000);
        message.delete(300);
    } else {
        client.yes(message, `**${cible.tag}** à été warn sur **${message.guild.name}** !`);
    }
    cible.send(`Tu a été warn du serveur **${message.guild.name}** pour la raison suivante : **${raison}**`).catch(e => message.channel.send(`${cible}, Tu a été warn sur ce serveur pour la raison : **${raison}**`));
    client.logs(message, 'Avertissement', logchannel);

    function permlevel (message, author) {
        if (!author) author = message.author;
        var permlvl = 1;
        let modRole = client.settings.get(message.guild.id).perms.mod;
        let adminRole = client.settings.get(message.guild.id).perms.admin;
        let ownerRole = client.settings.get(message.guild.id).perms.owner;
        let devID = `350710888812249101`;
        if (message.guild.member(author).roles.has(modRole)) permlvl = 2;
        if (message.guild.member(author).roles.has(adminRole)) permlvl = 3;
        if (message.guild.member(author).roles.has(ownerRole)) permlvl = 4;
        if (author.id == devID) permlvl = 5;
        return permlvl.toFixed().toString();
    };
};

exports.config = {
    aliases: ['warnuser'],
    permLevel: 0
};

exports.help = {
    name: 'Warn',
    description: 'Donner un avertissement à un Utilisateur.',
    usage: 'warn <@Utilisateur> <raison>',
    category: 'Modération'
};