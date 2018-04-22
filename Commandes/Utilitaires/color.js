const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    let colors = message.guild.roles.filter(role => role.name.startsWith('#'));
    if (colors.size < 1) return client.no(message, `Il n'y a aucune couleur pouvant être rejoint sur ce serveur.`);

    let str = args.join(" ");
    let role = colors.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase());

    if (!role) {
        let colorList = ``;
        colors.forEach(col => {
            colorList = `${colorList}\n- ${col.name.replace(/#/g, '')}`;
        })
        return message.channel.send(new RichEmbed()
        .addField(`Couleur(s) disponnible(s) sur ce serveur`, `${colorList}`, true)
        .setColor(0x42b0f4)
        );
    }

    try {
        await message.member.removeRoles(colors);
        await message.member.addRole(role);
        client.yes(message, `Tu est désormais de la couleur **${role.name.replace(/#/g, '')}** !`);
    } catch (e) {
        client.no(message, `Une erreur est survenue ... \`${e.message}\``);
    }
};

exports.config = {
    aliases: ['clr', 'joincolor'],
    permLevel: 0
};

exports.help = {
    name: 'Color',
    description: 'Rejoindre un role de couleur, le role doit commencer par un # pour pouvoir être rejoint.',
    usage: 'color <couleur>',
    category: 'Utilitaires'
};