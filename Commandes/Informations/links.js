const {
    RichEmbed
} = require('discord.js');

exports.run = async (client, message, args) => {
    message.channel.send(new RichEmbed()
        .setDescription(`Affichage de \`3\` Liens et de \`1\` Partenaire.`)
        .addField(`Liens`, `Lien d'invitation : [Shinda - 死んだ](https://discordapp.com/oauth2/authorize?client_id=415505035942952962&scope=bot&permissions=2146958591)\nServeur Discord : [Shinda Official Server \\🇫\\🇷](https://discord.gg/EgcWHex)\nSite Internet : [Shinda](http://frkuronekosama.wixsite.com/shinda)`)
        .addField(`Partenaires`, `Ist3r, serveur Inexistant ?`)
        .setColor(0x41c4f4));
};

exports.config = {
    aliases: ['invite', 'liens', 'link', 'lien', 'invit', 'partenaires', 'sponsor'],
    permLevel: 0
};

exports.help = {
    name: 'Liens',
    description: 'Voir les liens utiles du bot.',
    usage: 'liens',
    category: 'Informations'
};