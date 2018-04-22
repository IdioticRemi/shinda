const {
    RichEmbed
} = require('discord.js');
const chalk = require('chalk');

module.exports = async (client) => {

    client.writeSettings = (id, newSettings) => {
        let settings = client.settings.get(id);
        for (const key in newSettings) {
            settings[key] = newSettings[key];
        }
        client.settings.set(id, settings);
    }

    client.expMonitor = (client, message, exp, author) => {
        if (message.channel.type !== 'text') return;

        if (message.content.startsWith(client.settings.get(message.guild.id).prefix) && exp == false) return;
        if (client.settings.get(`exp_${message.guild.id}`) == false) return;

        if (!author) author = message.author;

        const score = client.exp.get(message.guild.id + '_' + author.id) || {
            guild: message.guild.id,
            user: message.author.username,
            exp: 0,
            level: 0
        };
        score.exp = score.exp + Math.floor(Math.random() * (12 - 5 + 1)) + 5;

        const curLevel = Math.floor(Math.sqrt(score.exp) / 10);

        if (score.level < curLevel) {
            if (client.settings.get(message.guild.id).mention == true) message.channel.send(`**Félicitations ${author} ! Tu passes au niveau ${curLevel} !**`);
            else message.channel.send(`**Félicitations \`${author.username}\` ! Tu passes au niveau ${curLevel} !**`);
            score.level = curLevel;
        }

        client.exp.set(message.guild.id + '_' + author.id, score);
    };

    client.random = async function (min, max) {
        let number = new Number();
        number = Math.floor(Math.random() * (max - min + 1)) + min;
        return number;
    };

    client.permlevel = async function (message, author) {
        if (!author) author = message.author;
        var permlvl = 1;
        let modRole = client.settings.get(message.guild.id).perms.mod;
        let adminRole = client.settings.get(message.guild.id).perms.admin;
        let ownerRole = client.settings.get(message.guild.id).perms.owner;
        let devID = `350710888812249101`;
        if (message.guild.member(author).roles.has(modRole)) permlvl = 2;
        if (message.guild.member(author).roles.has(adminRole)) permlvl = 3;
        if (message.guild.member(author).roles.has(ownerRole)) permlvl = 4;
        if (author.id == devID) permlvl = 5;
        return permlvl.toFixed().toString();
    };

    client.no = async function (message, text, display) {
        if (!display) {
            message.channel.send(`\\✖ | ${text}`);
        } else {
            message.channel.send(`\\✖ | ${text}`).then(msg => msg.delete(display).catch(e => {
                return;
            }));
        }
    }

    client.yes = async function (message, text, display, help) {
        if (!display) {
            message.channel.send(`\\✔ | ${text}`);
        } else {
            if (!help) {
                message.channel.send(`\\✔ | ${text}`).then(msg => msg.delete(display).catch(e => {
                    return;
                }));
            } else {
                message.channel.send(`\\✔ | ${text}`).then(msg => {
                    message.author.send(help).then(() => {
                        msg.delete(3000).catch(e => {
                            return;
                        });
                        message.delete(display).catch(e => {
                            return;
                        });
                    })
                });
            }
        }
    }

    client.loadCommand = async function (cmd_folder, command) {

        try {

            const cmd = require(`./Commandes/${cmd_folder}/${command}`);

            if (cmd.init) {
                cmd.init(client);
            }
            client.commands.set(cmd.help.name.toLowerCase(), cmd);

            cmd.config.aliases.forEach(async (aliase) => {

                client.aliases.set(aliase, cmd.help.name.toLowerCase());
            })

            console.log(chalk.green(`./${cmd_folder}/${command} : ✔`));
        } catch (error) {

            return console.log(chalk.red(`./${cmd_folder}/${command} : ✖ \n${error}`));
        }
    }

    client.nologs = async function (message) {
        client.no(message, `Veuillez défini un channel de logs : **\`${message.prefix}setlogs <#channel>\`** !`)
    }

    client.logs = async function (message, type, channel) {
        let cible = message.mentions.users.first();
        let raison = message.content.split(' ').splice(2).join(' ');
        let color;
        switch (type) {
            case "Bannissement":
                color = 0xf44141;
                break;
            case "Expulsion":
                color = 0xefe832;
                break;
            case "Mute":
                color = 0xe8f442;
                break;
            case "Unmute":
                color = 0xe8f442;
                break;
            case "Avertissement":
                color = 0x32ef51;
                break;
            default:
                color = 0x3291ef;
                break;
        }
        channel.send(new RichEmbed().setDescription(`**Sanction** : \`${type}\`\n**Auteur** : \`${message.author.tag}\`\n**Cible** : \`${cible.tag}\`\n**Raison** : \`${raison.replace('--silent', '').replace('-s', '')}\``).setColor(color));
    }

    // Error catching

    process.on('unhandledRejection', error => console.log(chalk.yellow(`${error.stack}`)))
        .on('uncaughtException', error => {
            console.log(chalk.red(`${error.stack}`));
            process.exit();
        })
        .on('error', error => {
            console.log(chalk.yellow(`${error.stack}`))
        })
        .on('warn', error => {
            console.log(chalk.yellow(`${error.stack}`))
        });
}