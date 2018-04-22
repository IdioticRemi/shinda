exports.run = async (client, message, args) => {
    await message.channel.send(`Êtes-vous sûr de cette décision ? (Ecrivez : **Oui** ou **Non**)`);
    try {
        var response = await message.channel.awaitMessages(msg => msg.content.toLowerCase() == 'oui' || msg.content.toLowerCase() == 'non' && msg.author.id == message.author.id, {
            maxMatches: 1,
            time: 10000,
            errors: ['time']
        });
    } catch (err) {
        return client.no(message, `Aucune réponse n'a étée donnée, annulation du processus. ${err}`);
    }
    if (response.first().content.toLowerCase() == 'oui') {
        response.first().delete(300);

        let msg = message;
        let chan = msg.channel;
        let pos = chan.position;
        
        await message.delete(300)
        await msg.channel.delete();
        await msg.channel.clone();
        let c = await msg.guild.channels.find('name', chan.name);
        await c.setPosition(pos);

        msg.author.send(`Le salon **#${msg.channel.name}** à été purge sur **${msg.guild.name}** !`);
    } else {
        response.first().delete(300);
        client.no(message, `Le processus a été annulé manuellement !`);
        message.delete(300);
    }
};

exports.config = {
    aliases: ['purgechannel', 'clonechannel', 'cc', 'prg'],
    permLevel: 3
};

exports.help = {
    name: 'Purge',
    description: 'Supprimer TOUT les messages du salon actuel.',
    usage: 'purge',
    category: 'Modération'
};