exports.run = (client, message, args) => {
    if (!args[0]) {
        client.no(message, `Veuiwwez entwew un message à twaduiwe x3`)
    } else {
        let msg = args.join(' ').replace(/r/g, 'w').replace(/l/g, 'w');
        let hewwo = `${msg} OwO`;
        message.channel.send(hewwo);
    }
}

exports.config = {
    aliases: ['hewo'],
    permLevel: 0
};

exports.help = {
    name: 'OwO',
    description: 'Twaduiwe en wangage OwO.',
    usage: 'owo <texte>',
    cat: 'Fun'
};