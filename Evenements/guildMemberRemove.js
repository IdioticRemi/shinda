module.exports = (client, member) => {
    let welcome = member.guild.channels.get(client.settings.get(member.guild.id).welcome.channel);
    let leave = client.settings.get(member.guild.id).welcome.leave;
    if (welcome) {
        if (leave) {
            leave = leave.replace(/%USER%/g, `${member.user.username}`).replace(/%MEMBERS%/g, `${member.guild.memberCount}`).replace(/%GUILD%/g, `${member.guild.name}`);
            welcome.send(leave);
        }
    }
};