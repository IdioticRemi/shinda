exports.run = async (client, message, args) => {
    if (client.settings.get(message.guild.id).expsystem == false) return client.no(message, `Le système d'experience est désactivé sur votre serveur.`);

    if (!args[0]) return client.no(message, `Veuillez entrer l'ID de quelqu'un !`);
    if (!args[1] || isNaN(args[1])) return client.no(message, `Veuillez entrer le nombre d'exp qui sera remis à la personne !`);

    const score = {
        guild: message.guild.id,
        user: message.author.username,
        exp: 0,
        level: 0
    };
    score.exp = parseInt(args[1]);

    client.exp.set(message.guild.id + '_' + args[0], score);

    client.yes(message, `L'exp de l'utilisateur avec l'ID **${args[0]}** a été définie à **${parseInt(args[1])} exp** !`, 5000);
    message.delete(300);
};

exports.config = {
    aliases: ['setxp', 'enmapxp', 'defexp'],
    permLevel: 5
};

exports.help = {
    name: 'Setexp',
    description: 'Définir l\'exp d\'une personne sur le serveur.',
    usage: 'setexp <ID> <exp>',
    category: 'System'
};