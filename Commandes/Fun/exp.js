const { RichEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    let author = message.mentions.users.first() ? message.guild.member(message.mentions.users.first()).user : message.author;

    if (client.settings.get(message.guild.id).expsystem == false) return client.no(message, `Le système d'experience est désactivé sur votre serveur.`);

    client.expMonitor(client, message, true, author);
    
    const score = client.exp.get(message.guild.id + '_' + author.id);

    const curLevel = Math.floor(Math.sqrt(score.exp) / 10);
    const reqExp = Math.floor((10 * (curLevel + 1)) * (10 * (curLevel + 1)));

    var keyArray = [];
    
    client.exp.keyArray().forEach(val => {
        if (!val.toString().startsWith(message.guild.id)) return;
        keyArray.push(val);
    });

    var keySize = keyArray.length;
    var rank = keySize;
    
    client.exp.keyArray().forEach(val => {
        if (!val.toString().startsWith(message.guild.id)) return;

        if (val.toString().endsWith(author.id)) return;

        if (client.exp.get(message.guild.id + '_' + author.id).exp >= client.exp.get(val).exp) rank--;
    });

    message.channel.send(new RichEmbed()
    .setAuthor(author.username, author.avatarURL)
    .addField('Rank', `${rank}/${keySize}`, true)
    .addField('Lvl.', `${Math.floor(score.level)}`, true)
    .addField('Exp.', `${score.exp}/${reqExp}, ${reqExp - score.exp} restant`, true)
    .setColor(0x42b0f4)
    );
};

exports.config = {
    aliases: ['level', 'lvl', 'xp'],
    permLevel: 0
};

exports.help = {
    name: 'Exp',
    description: 'Voir son experience et son niveau.',
    usage: 'exp [@Utilisateur]',
    category: 'Fun'
};