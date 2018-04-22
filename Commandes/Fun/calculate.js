const scalc = require('scalc');

exports.run = async (client, message, args) => {
    if (!args[0]) {
        client.no(message, `Veuillez me donner un calcul à faire !`);
    } else {
        try {
            let res = scalc(`${args.join(' ').replace('\\*', '*')}`);
            client.yes(message, `Le résultat de votre calcul est : **\`${res}\`**`);
        } catch (e) {
            client.no(message, `Impossible de résoudre ce calcul ! Vérifiez bien les notations !`);
        }
    }
}

exports.config = {
    aliases: ['calc', 'cal'],
    permLevel: 0
};

exports.help = {
    name: 'Calculate',
    description: 'Résoudre un calcul.',
    usage: 'calculate <calcul>',
    cat: 'Fun'
};