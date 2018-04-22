const fs = require('fs-nextra');
const Enmap = require('enmap');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
        if (!args[0]) {
            let help = new Discord.RichEmbed().setColor(0x32ef51);
            let cmdes = 0;

            const dirs = await fs.readdir('./Commandes/');
            await dirs.forEach(async (dir) => {
                if (dir == 'System') return;
                let cat = '';
                const cmds = await fs.readdir(`./Commandes/${dir}/`);
                cmds.forEach(cmd => {
                    const c = require(`../${dir}/${cmd}`);
                    cat += `, **\`${c.help.name}\`**`;
                    cmdes++;
                });
                help.addField(dir, cat.slice(2));
                help.setDescription(`Affichage de **\`${cmdes}\`** commandes, faites **\`${message.prefix}help <commande>\`** pour plus d'informations !`);
            });
            client.yes(message, `**\`${message.author.tag}\`**, regardez vos **messages privés** !`, 300, help);
        } else {
            let command;

            if (client.commands.has(args[0])) {
                command = args[0];
            } else if (client.aliases.has(args[0])) {
                command = client.aliases.get(args[0]);
            } else {
                client.no(message, `Cette commande n'existe pas ! Faites **\`${message.prefix}help\`** pour voir la liste des commandes !`, 5000);
                message.delete(300);
            }
            if (client.commands.has(command)) {
                command = client.commands.get(command);
                let e = new Discord.RichEmbed()
                    .setTitle(`Commande : ${message.prefix}${command.help.name}`)
                    .addField(`Description`, `\`${command.help.description}\``, true)
                    .addField(`Utilisation`, `\`${message.prefix}${command.help.usage}\``, true)
                    .addField(`Permission`, `\`${command.config.permLevel}\``, true)
                    .addField(`Aliases`, `\`${command.config.aliases.join('\`, \`')}\``, true);
                if (command.config.permLevel > permlevel(message)) {
                    e.setColor(0xff4141);
                } else if (command.config.permLevel == permlevel(message) && command.config.permLevel != 0) {
                    e.setColor(0xefe832);
                } else {
                    e.setColor(0x32ef51);
                }

                message.channel.send(e);
        }
    }

    function permlevel (message, author) {
        if (!author) author = message.author;
        var permlvl = 1;
        let modRole = client.settings.get(message.guild.id).perms.mod;
        let adminRole = client.settings.get(message.guild.id).perms.admin;
        let ownerRole = client.settings.get(message.guild.id).perms.owner;
        let devID = `
                        350710888812249101 `;
        if (message.guild.member(author).roles.has(modRole)) permlvl = 2;
        if (message.guild.member(author).roles.has(adminRole)) permlvl = 3;
        if (message.guild.member(author).roles.has(ownerRole)) permlvl = 4;
        if (author.id == devID) permlvl = 5;
        return permlvl.toFixed().toString();
    };
};

exports.config = {
    aliases: ['h', 'cmds', 'cmd'],
    permLevel: 0
};

exports.help = {
    name: 'Help',
    description: 'Voir toutes les commandes disponnibles et leur description.',
    usage: 'help [commande]',
    category: 'Informations'
};