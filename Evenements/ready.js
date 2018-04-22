const chalk = require('chalk');

module.exports = client => {
    console.log(chalk.white.bgGreen(`Je suis connecté : ${client.user.tag}\n`));
    client.user.setActivity(`-help | ${client.guilds.size} Guilds`, { type: "WATCHING" });
}