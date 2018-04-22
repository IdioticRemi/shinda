const superagent = require('superagent');
const { RichEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    let {body} = await superagent
    .get('http://aws.random.cat/meow');

    let embed = new RichEmbed()
    .setColor(0xfffff)
    .setTitle(`Image de chat random :cat:`)
    .setImage(body.file);

    message.channel.send(embed);
};

exports.config = {
    aliases: ['chat', 'miaou'],
    permLevel: 0
};

exports.help = {
    name: 'Cat',
    description: 'Trouver une image de chat random.',
    usage: 'cat',
    category: 'Fun'
};