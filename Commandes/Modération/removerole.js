const { RichEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    let rMember = message.guild.member(message.mentions.users.first());
    let role = message.mentions.roles.first();

    if (!rMember || !role) return client.no(message, `Utilisation : **\`${message.prefix}removerole <@Utilisateur> <@Role>\`**`);
    if (!rMember.roles.has(role.id)) return client.no(message, `Cette personne n'a pas le role ${role} !`);
    if (! message.guild.member(client.user).hasPermission('MANAGE_ROLES')) client.no(message, `Je n'ai pas la permission de **gérer les roles**.`);
    
    client.yes(message, `Le role **${role.name}** a été retiré à **${rMember.user.tag}**`);
    await rMember.removeRole(role.id);
};

exports.config = {
    aliases: ['rolerem', 'remrl', 'role-'],
    permLevel: 3
};

exports.help = {
    name: 'RemoveRole',
    description: 'Retirer un role à un joueur.',
    usage: 'removerole <@Utilisateur> <@role>',
    category: 'Modération'
};