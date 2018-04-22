exports.run = async (client, message, args) => {
    const m = await message.channel.send("Chargement ...");
    m.edit(`**Pong !** Le temps de réponse entre toi et moi correspond à **${m.createdTimestamp - message.createdTimestamp}ms**.`);
}

exports.config = {
    aliases: ['pong', 'latence', 'ms'],
    permLevel: 0
};

exports.help = {
    name: 'Ping',
    description: 'Voir quel est le ping du bot.',
    usage: 'ping',
    category: 'Informations'
};