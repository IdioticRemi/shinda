exports.run = async (client, message, args) => {
    let msg = await message.channel.send(`🎲 Le dé a été lancé ...`);
    setTimeout(() => {
        msg.edit(`🎲 Le dé s'est arrêté sur le chiffre **${Math.floor(Math.random() * (6 - 1 + 1)) + 1}**`);
    }, 3000);
};

exports.config = {
    aliases: ['dice', 'roll', 'dés', 'dé'],
    permLevel: 0
};

exports.help = {
    name: 'RollDice',
    description: 'Lancer un dé à 6 faces.',
    usage: 'rolldice',
    category: 'Fun'
};