const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    if (args.length < 1 || isNaN(args[0])) {
        client.no(message, `Utilisation : **\`${message.prefix}clear <1-99>\`**`);
    } else {
        if (!message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return client.no(message, `Je n'ai pas la permission de **supprimer les messages** !`);
        let toFetch = (parseInt(args[0]) + 1);
        if (toFetch > 100) return client.no(message, `Je ne peut pas supprimer **plus de 99** messages à la fois !`);
        message.channel.fetchMessages({
            limit: toFetch
        }).then(list => {
            message.channel.bulkDelete(list).then(() => {
                client.yes(message, `**${list.size - 1}** messages ont été supprimés !`, 5000);
            });
        }, function (err) {
            client.no(message, `Une erreur est survenue lors de la suppression de ${toFetch -1} messages.`, 5000);
            console.log(err);
        });
    }
};

exports.config = {
    aliases: ['clean', 'prune'],
    permLevel: 3
};

exports.help = {
    name: 'Clear',
    description: 'Supprimer (x) messages sur le channel.',
    usage: 'clear <1~99>',
    cat: 'Modération'
};