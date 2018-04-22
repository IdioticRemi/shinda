module.exports = (client, member) => {
    let welcome = member.guild.channels.get(client.settings.get(member.guild.id).welcome.channel);
    let join = client.settings.get(member.guild.id).welcome.join;
    if (welcome) {
        if (join) {
            join = join.replace(/%USER%/g, `${member.user.username}`).replace(/%MEMBERS%/g, `${member.guild.memberCount}`).replace(/%GUILD%/g, `${member.guild.name}`);
            welcome.send(join);
        }
    }
    if (!client.settings.get(member.guild.id).welcome.autorole) return;
    if (!member.guild.roles.get(client.settings.get(member.guild.id).welcome.autorole)) {
        if (welcome) {
            welcome.send(`\\✖ | Votre autorole à été désactivé car le rôle de join n'existe plus.`).then(msg => msg.delete(120000));
            const settings = client.settings.get(member.guild.id);
            settings.welcome.channel = undefined;
            client.settings.set(member.guild.id, settings);
        }
        return;
    }
    try {
        member.addRole(member.guild.roles.get(client.settings.get(member.guild.id).welcome.autorole));
    } catch (e) {}
};