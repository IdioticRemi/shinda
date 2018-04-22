// Dependencies

const Discord = require('discord.js');
const fs = require('fs-nextra');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const chalk = require('chalk');

// Discord bot client

var client = new Discord.Client();

// Additional Imports [ Files | Folders ]

const config = require('./config.json');

require('./functions.js')(client);

// Variables générales

client.config = config;
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({
    provider: new EnmapLevel({
        name: 'settings'
    })
});
client.exp = new Enmap({
    provider: new EnmapLevel({
        name: 'exp'
    })
});
client.queue = new Map();

// Fonctions

const init = async() => {

    const cmd_folders = await fs.readdir(`./Commandes/`);

    cmd_folders.forEach(async (cmd_folder) => {
        const commands = await fs.readdir(`./Commandes/${cmd_folder}`);
        console.log(chalk.yellow(`Chargement de ${commands.length} commandes dans la catégorie ${cmd_folder}.`));

        commands.forEach(command => {
            if (!command.endsWith(`.js`)) return;
            client.loadCommand(cmd_folder, command);
        })

        console.log(``);
    })

    const event_files = await fs.readdir("./Evenements/");

    event_files.forEach(evt => {
        try {
            const eventName = evt.split(".")[0];
            const event = require(`./Evenements/${evt}`);
            client.on(eventName, event.bind(null, client));
            delete require.cache[require.resolve(`./Evenements/${evt}`)];
        } catch (e) {

        }
    });

    client.login(config.token);
}

// Starting

console.log('');
init();