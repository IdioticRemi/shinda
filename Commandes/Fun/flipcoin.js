exports.run = async (client, message, args) => {
    let msg = await message.channel.send(`🔶 J'ai jeté la pièce en l'air, attendons qu'elle atterisse...`);
    setTimeout(() => {
        let pf = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        if (pf == 1) pf = 'pile';
        else pf = 'face'
        msg.edit(`🔶 Le pièce est tombée sur **${pf}** !`);
    }, 3000);
};

exports.config = {
    aliases: ['pile', 'face', 'coinflip', 'flip', 'pileface', 'pileouface'],
    permLevel: 0
};

exports.help = {
    name: 'FlipCoin',
    description: 'Lancez une pièce en l\'air, faites vos paris !',
    usage: 'flipcoin',
    category: 'Fun'
};