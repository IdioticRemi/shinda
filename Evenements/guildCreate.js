module.exports = (client, guild) => {
    client.user.setActivity(`-help | ${client.guilds.size} Guilds`, { type: "WATCHING" });
};