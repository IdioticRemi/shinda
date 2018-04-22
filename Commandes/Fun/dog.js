const superagent = require('superagent');
const { RichEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    let {body} = await superagent
    .get('http://random.dog/woof.json');

    let embed = new RichEmbed()
    .setColor(0xfffff)
    .setTitle(`Image de chien random :dog:`)
    .setImage(body.url);

    message.channel.send(embed);
};

exports.config = {
    aliases: ['chien', 'woof', 'ouaf', 'iench'],
    permLevel: 0
};

exports.help = {
    name: 'Dog',
    description: 'Trouver une image de chien random.',
    usage: 'dog',
    category: 'Fun'
};