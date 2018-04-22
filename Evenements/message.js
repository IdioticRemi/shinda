module.exports = async (client, message) => {
    if (message.channel.type != 'text') return;
    if (message.author.bot) return;

    let guild = message.guild.id;

    const settings = {
        prefix: "-",
        perms: {
            mod: undefined,
            admin: undefined,
            owner: undefined
        },
        modlogs: undefined,
        logs: undefined,
        welcome: {
            channel: undefined,
            join: undefined,
            leave: undefined,
            autorole: undefined
        },
        expsystem: true,
        mention: true,
        mutes: []
    }

    if (!client.settings.get(guild)) client.settings.set(guild, settings);
    if (!client.settings.get(guild).prefix) client.writeSettings(guild, { prefix: '-' });

    let prefix = client.settings.get(guild).prefix;
    let command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
    let args = message.content.split(' ').slice(1);

    if (client.settings.get(guild).expsystem != false) client.expMonitor(client, message, false);

    if (client.settings.get(guild).mutes.includes(message.author.id)) {
        if (permlevel(message) < 2) {
            if (message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return await message.delete();
        } else {
            if (message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) await message.delete();
        }
    }

    if (!message.content.startsWith(prefix)) return;

    message.prefix = prefix;

    if (client.commands.has(command)) {
        var cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        var cmd = client.commands.get(client.aliases.get(command));
    } else {
        return;
    }

    let perms = permlevel(message);
    let queue = client.queue;

    if (!message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return;

    if (cmd) {
        if (perms < cmd.config.permLevel) {
            client.no(message, `${message.author}, Tu n'a pas la permission nécessaire ! Permission requise : **${cmd.config.permLevel}**, Permission actuelle : **${perms}**`).then(msg => msg.delete(5000));
            try { message.delete(300) } catch (e) {}
        } else {
            cmd.run(client, message, args, queue);
        }
    }

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
}