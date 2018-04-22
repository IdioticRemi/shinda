const urban = require('relevant-urban');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return client.no(message, `Veuillez entrer un **mot** dont vous voulez voir la **définition** !`);

    let res = await urban(args.join(' ')).catch(e => {
        return client.no(message, `Je n'ai pas pu trouver ce mot dans le dictionnaire Anglais !`);
    });

    const embed = new RichEmbed()
    .setColor(0xf44141)
    .setAuthor(`${res.word}`, "https://cdn3.iconfinder.com/data/icons/education-and-school/512/book_education_literature_textbook_flat_icon-256.png")
    .addField('Définition', res.definition)
    .addField('Example', res.example)
    .addField('Lien', res.urbanURL)
    //.setDescription(`**Définition :**\n${res.definition}\n\n**Example :**\n${res.example}\n\n**Lien :**\n${res.urbanURL}`)
    .setURL(res.urbanURL);

    message.channel.send(embed);
};

exports.config = {
    aliases: ['definition'],
    permLevel: 0
};

exports.help = {
    name: 'Urban',
    description: 'Rechercher un mot dans le dictionnaire Anglais.',
    usage: 'urban <mot>',
    category: 'Utilitaires'
};