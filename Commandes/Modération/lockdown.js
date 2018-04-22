const ms = require('ms');
const Discord = require('discord.js');
const chalk = require('chalk');

exports.run = async (client, message, args, funcs) => {
    if (!client.lockit) client.lockit = [];
    let time = args.join(' ');

    if (!time) {
        client.no(message, `Utilisation : **\`${message.prefix}lockdown <unlock|temps>\`**`);
    } else {
        if (time == 'unlock') {
            message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: null
            }).then(() => {
                client.yes(message, `Tout le monde peut désormais envoyer des messages dans ce channel !`);
                clearTimeout(client.lockit[message.channel.id]);
                delete client.lockit[message.channel.id];
            }).catch(error => {
                console.log(chalk.red(error));
            });
        } else {
            if (!message.channel.permissionsFor(client.user).has("MANAGE_ROLES_OR_PERMISSIONS")) return client.no(message, `Je n'ai pas la permission de **modifier les permissions de ce channel** !`)
            client.yes(message, `Personne ne pourra envoyer de message pendant **\`${ms(ms(time), { long:true })}\`** dans ce channel !`);
            message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: false
            }).then(() => {
                client.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null
                    }).then(() => {
                            client.yes(message, `Tout le monde peut désormais envoyer des messages dans ce channel !`);
                            delete client.lockit[message.channel.id];
                        })
                }, ms(time));
            }).catch(error => {
                console.log(chalk.red(error));
            });
        }
    }
};

exports.config = {
    aliases: ['lockchannel', 'lock'],
    permLevel: 3
};

exports.help = {
    name: 'Lockdown',
    description: 'Désactiver l\'envoi des messages sur un channel pendant un certain temps.',
    usage: 'lockdown <temps>',
    cat: 'Modération'
};