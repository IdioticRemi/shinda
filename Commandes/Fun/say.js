const scalc = require('scalc');

exports.run = async (client, message, args) => {
    if (!args[0]) {
        client.no(message, `Veuillez me donner quelque chose à dire !`);
    } else {
        if (message.content.includes(' --silent') || message.content.includes(' -s')) {
            message.channel.send(`${args.join(' ').replace('--silent', '').replace('-s', '')}`);
            message.delete(300);
        } else {
            message.channel.send(`${args.join(' ')}`);
        }
    }
}

exports.config = {
    aliases: ['sayme', 'parle', 'dire'],
    permLevel: 0
};

exports.help = {
    name: 'Say',
    description: 'me faire dire un truc ;-;',
    usage: 'say <message> [--silent]',
    cat: 'Fun'
};