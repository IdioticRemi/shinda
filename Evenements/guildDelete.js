module.exports = (client, guild) => {
    client.user.setActivity(`-help | ${client.guilds.size} Guilds`, { type: "WATCHING" });

    try {
        client.settings.delete(guild.id);
    } catch (e) {
        console.log(e.stack);
    }
};