const shorten = require('isgd');

exports.run = async (client, message, args) => {
    if (!args[0]) return client.no(message, `Utilisation : **\`${message.prefix}shorten <URL> [titre]\`**`);
    if (!args[1]) {
        shorten.shorten(args[0], function (res) {
            if (res.startsWith(`Error:`)) return client.no(message, `Veuillez entrer une URL valide !`);

            client.yes(message, `Voici votre lien raccourci : **<${res}>**`);
        });
    } else {
        shorten.custom(args[0], args[1], function (res) {
            if (res.startsWith(`Error:`)) {
                if (res.startsWith(`Error: The shortened URL you picked already exists`)) return client.no(message, `Le lien customisé **${args[1]}** existe déja, choisissez-en un autre !`)
                return client.no(message, `Une erreur est survenue, URL invalide ?\n**\`${res}\`**`);
            }

            client.yes(message, `Voici votre lien raccourci customisé : **<${res}>**`);
        });
    }
};

exports.config = {
    aliases: ['short', 'isgd', 'url', 'shorturl'],
    permLevel: 0
};

exports.help = {
    name: 'Shorten',
    description: 'Raccourcir une URL un peut trop longue.',
    usage: 'shorten <URL> [titre]',
    category: 'Utilitaires'
};