const { RichEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    let rMember = message.guild.member(message.mentions.users.first());
    let role = message.mentions.roles.first();

    if (!rMember || !role) return client.no(message, `Utilisation : **\`${message.prefix}addrole <@Utilisateur> <@Role>\`**`);
    if (rMember.roles.has(role.id)) return client.no(message, `Cette personne a déjà le role ${role} !`);
    if (! message.guild.member(client.user).hasPermission('MANAGE_ROLES')) client.no(message, `Je n'ai pas la permission de **gérer les roles**.`);
    
    client.yes(message, `Le role **${role.name}** a été ajouté à **${rMember.user.tag}**`);
    await rMember.addRole(role.id);
};

exports.config = {
    aliases: ['roleadd', 'addrl', 'role+'],
    permLevel: 3
};

exports.help = {
    name: 'AddRole',
    description: 'Ajouter un role à un joueur.',
    usage: 'addrole <@Utilisateur> <@role>',
    category: 'Modération'
};