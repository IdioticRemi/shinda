exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id != `350710888812249101`) return client.no(message, `Tu n'a pas la permission **Administrateur**`);
    }

    var msg1;
    var msg2;
    var msg3;
    var msg4;
    var msg5;
    var msg6;
    var msg7;
    var msg8;
    var msg9;
    var endmsg;

    // Prefixe

    message.channel.send(`Veuillez entrer un **prefixe** après ce message.`).then(msg => msg1 = msg);
    try {
        var res1 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
            maxMatches: 1,
            time: 15000,
            errors: ['time']
        });

        client.writeSettings(message.guild.id, {
            prefix: res1.first().content.toLowerCase()
        });
        client.yes(message, `Le **préfixe** du bot à été changé en **${res1.first().content}**`, 5000);
    } catch (err) {
        client.no(message, `Aucun **préfixe** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setprefix**`, 5000);
    }

    // Permissions

    message.channel.send(`Veuillez mentionner un role pour la permission **MOD** après ce message.`).then(msg => msg2 = msg);
    try {
        var res2 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg.mentions.roles.size > 0, {
            maxMatches: 1,
            time: 15000,
            errors: ['time']
        });

        const settings0 = client.settings.get(message.guild.id);
        settings0.perms.mod = res2.first().mentions.roles.first().id;
        client.settings.set(message.guild.id, settings0);
        client.yes(message, `La permission **MOD** a été définie sur le role ${res2.first().mentions.roles.first()} !`, 5000);
    } catch (err) {
        client.no(message, `Aucun **role** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setperm mod**`, 5000);
    }

    message.channel.send(`Veuillez mentionner un role pour la permission **ADMIN** après ce message.`).then(msg => msg3 = msg);
    try {
        var res3 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg.mentions.roles.size > 0, {
            maxMatches: 1,
            time: 15000,
            errors: ['time']
        });

        const settings1 = client.settings.get(message.guild.id);
        settings1.perms.admin = res3.first().mentions.roles.first().id;
        client.settings.set(message.guild.id, settings1);
        client.yes(message, `La permission **ADMIN** a été définie sur le role ${res3.first().mentions.roles.first()} !`, 5000);
    } catch (err) {
        client.no(message, `Aucun **role** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setperm admin**`, 5000);
    }

    message.channel.send(`Veuillez mentionner un role pour la permission **OWNER** après ce message.`).then(msg => msg4 = msg);
    try {
        var res4 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg.mentions.roles.size > 0, {
            maxMatches: 1,
            time: 15000,
            errors: ['time']
        });

        const settings2 = client.settings.get(message.guild.id);
        settings2.perms.owner = res4.first().mentions.roles.first().id;
        client.settings.set(message.guild.id, settings2);
        client.yes(message, `La permission **OWNER** a été définie sur le role ${res4.first().mentions.roles.first()} !`, 5000);
    } catch (err) {
        client.no(message, `Aucun **role** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setperm owner**`, 5000);
    }

    // Logs

    message.channel.send(`Veuillez entrer un channel pour les logs de **MODÉRATION** après ce message.`).then(msg => msg5 = msg);
    try {
        var res5 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg.mentions.channels.size > 0, {
            maxMatches: 1,
            time: 15000,
            errors: ['time']
        });

        client.writeSettings(message.guild.id, {
            modlogs: res5.first().mentions.channels.first().id
        });

        client.yes(message, `Le **channel des logs de modération** à été changé en ${res5.first().mentions.channels.first()} !`, 5000);
    } catch (err) {
        client.no(message, `Aucun channel pour les logs de **MODÉRATION** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setlogs**`, 5000);
    }

    // Welcome Settings

    message.channel.send(`Veuillez entrer un channel pour les **messages de join / leave** après ce message.`).then(msg => msg6 = msg);
    try {
        var res6 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg.mentions.channels.size > 0, {
            maxMatches: 1,
            time: 15000,
            errors: ['time']
        });

        const settings3 = client.settings.get(message.guild.id);
        settings3.welcome.channel = res6.first().mentions.channels.first().id;
        client.settings.set(message.guild.id, settings3);
        client.yes(message, `Le **channel pour les messages de join / leave** a été défini sur ${res6.first().mentions.channels.first()} !`, 5000);
    } catch (err) {
        client.no(message, `Aucun **channel** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setwelc**`, 5000);
    }

    message.channel.send(`Veuillez entrer un **message de join** après ce message, %USER% = Pseudo de la personne, %GUILD% = Nom du serveur, %MEMBERS% = Nombre de membres.\nEcrivez : **ANNULER** pour sauter cette étape.`).then(msg => msg7 = msg);
    try {
        var res7 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
            maxMatches: 1,
            time: 120000,
            errors: ['time']
        });

        if (res7.first().content.toUpperCase() != "ANNULER") {
            const settings4 = client.settings.get(message.guild.id);
            settings4.welcome.join = res7.first().content;
            client.settings.set(message.guild.id, settings4);
            client.yes(message, `Le message de join à été changé : \n\n${res7.first().content}`, 5000);
        } else {
            client.no(message, `Aucun **message de join** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setjoin**`, 5000);
        }
    } catch (err) {
        console.log(err);
        client.no(message, `Aucun **message de join** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setjoin**`, 5000);
    }

    message.channel.send(`Veuillez entrer un **message de leave** après ce message, %USER% = Pseudo de la personne, %GUILD% = Nom du serveur, %MEMBERS% = Nombre de membres.\nEcrivez : **ANNULER** pour sauter cette étape.`).then(msg => msg8 = msg);
    try {
        var res8 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
            maxMatches: 1,
            time: 120000,
            errors: ['time']
        });

        if (res8.first().content.toUpperCase() != "ANNULER") {
            const settings5 = client.settings.get(message.guild.id);
            settings5.welcome.leave = res8.first().content;
            client.settings.set(message.guild.id, settings5);
            client.yes(message, `Le message de leave à été changé : \n\n${res8.first().content}`, 5000);
        } else {
            client.no(message, `Aucun **message de leave** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setleave**`, 5000);
        }
    } catch (err) {
        client.no(message, `Aucun **message de leave** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setleave**`, 5000);
    }

    message.channel.send(`Veuillez mentionner un role de bienvenue après ce message.`).then(msg => msg9 = msg);
    try {
        var res9 = await message.channel.awaitMessages(msg => msg.author.id == message.author.id && msg.mentions.roles.size > 0, {
            maxMatches: 1,
            time: 15000,
            errors: ['time']
        });

        const settings6 = client.settings.get(message.guild.id);
        settings6.welcome.autorole = res9.first().mentions.roles.first().id;
        client.settings.set(message.guild.id, settings6);
        client.yes(message, `Le role de bienvenue a été changé : ${res9.first().mentions.roles.first()} !`, 5000);
    } catch (err) {
        client.no(message, `Aucun **role** n'a été donné, vous pourrez le définir via la commande : **${message.prefix}setauto**`, 5000);
    }

    await message.channel.send(`Mise à jour de la configuration et suppression des messages en cours ...`).then(msg => endmsg = msg);

    try {
        await msg1.delete();
        await msg2.delete();
        await msg3.delete();
        await msg4.delete();
        await msg5.delete();
        await msg6.delete();
        await msg7.delete();
        await msg8.delete();
        await msg9.delete();
        await res1.first().delete();
        await res2.first().delete();
        await res3.first().delete();
        await res4.first().delete();
        await res5.first().delete();
        await res6.first().delete();
        await res7.first().delete();
        await res8.first().delete();
        await res9.first().delete();
    } catch (e) {
        console.log(e.stack);
        message.channel.send(`Je n'ai pas la permissions de **supprimer les messages**. La configuration va être mise à jour !`).then(msg => msg.delete(7500));
    }

    endmsg.edit(`La mise à jour de la configuration est terminée ! **Bonne utilisation !**`);
};

exports.config = {
    aliases: ['setallup', 'setupconfig', 'configsetup', 'setupcfg', 'init'],
    permLevel: 0
};

exports.help = {
    name: 'Setup',
    description: 'Complêter tout la configuration du bot sur votre serveur.',
    usage: 'setup',
    category: 'Administration'
};