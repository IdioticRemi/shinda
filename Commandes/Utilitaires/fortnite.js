const fortnite = require('fortnite');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    if (!args[0]) return client.no(message, `Veuillez entrer au moins un argument !`)

    const stats = new fortnite(client.config.TRN_KEY);
    
    let platform;
    let username;

    if (!["pc", "psn", "xbl"].includes(args[0])) return client.no(message, `Utilisation : **\`${message.prefix}fortnite <pc|psn|xbl> <pseudo>\`**`);

    platform = args.shift();
    username = args.join(' ');

    stats.getInfo(username, platform.toLowerCase()).then(data => {
        const embed = new RichEmbed()
        .setColor(0xffffff)
        .setTitle(`Stats de ${username}`)
        .addField(`Meilleures places`, `Top 3s: ${data.lifetimeStats[0].value}\nTop 5s: ${data.lifetimeStats[1].value}\nTop 6s: ${data.lifetimeStats[3].value}\nTop 12s: ${data.lifetimeStats[4].value}\nTop 25s: ${data.lifetimeStats[5].value}`, true)
        .addField(`Score Total`, `${data.lifetimeStats[6].value}`, true)
        .addField(`Matchs joués`, `${data.lifetimeStats[7].value}`, true)
        .addField(`Victoires`, `${data.lifetimeStats[8].value}`, true)
        .addField(`Pourcentage de parties gagnées`, `${data.lifetimeStats[9].value}`, true)
        .addField(`Kills`, `${data.lifetimeStats[10].value}`, true)
        .addField(`Ratio K/D`, `${data.lifetimeStats[11].value}`, true)
        .addField(`Kills par minute`, `${data.lifetimeStats[12].value}`, true)
        .addField(`Temps de jeu`, `${data.lifetimeStats[13].value}`, true)
        .addField(`Temps de survie moyen`, `${data.lifetimeStats[14].value}`, true);

        message.channel.send(embed);
    }).catch(error => {
        client.no(message, `Je n'ai pas pu trouver de statistiques pour cet utilisateur.`);
    });
};

exports.config = {
    aliases: ['fstats', 'fnstats', 'fn'],
    permLevel: 0
};

exports.help = {
    name: 'Fortnite',
    description: 'Regarder les stats d\'un joueur sur Fortnite.',
    usage: 'fortnite <plateforme> <pseudo>',
    category: 'Utilitaires'
};