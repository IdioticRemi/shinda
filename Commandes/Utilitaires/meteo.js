const Discord = require('discord.js');
const weather = require('weather-js');

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed();
    if (!args[0]) {
        client.no(message, `Utilisation : **\`${message.prefix}meteo <ville>\`**`);
    } else {
        weather.find({
            search: args,
            degreeType: 'C'
        }, (err, result) => {
            if (err) {
                client.no(message, `Un erreur est survenue lors de la commande !`);
            } else {
                if (result.length === 0) {
                    client.no(message, `Le lieu **\`${args}\`** n'existe pas !`);
                } else {
                    let current = result[0].current;
                    let location = result[0].location;
        
                    embed.setAuthor(`Météo de ${current.observationpoint}`);
                    embed.setDescription(`Lieu : **\`${current.observationpoint}\`**\nZone : **\`UTC ${location.timezone}\`**\nTempérature : **\`${current.temperature}°C\`**\nTempérature ressentie : **\`${current.feelslike}°C\`**\nRaffale de vents : **\`${current.winddisplay}\`**\nHumidité : **\`${current.humidity}%\`**`);
                    embed.setThumbnail(current.imageUrl);
                    embed.setColor(0x00AE86);
                    message.channel.send(embed);
                }
            }
        });
    }
}

exports.config = {
    aliases: ['weather', 'missmeteo'],
    permLevel: 0
};

exports.help = {
    name: 'Meteo',
    description: 'Voir la météo dans un ville.',
    usage: 'meteo <ville>',
    category: 'Utilitaires'
};