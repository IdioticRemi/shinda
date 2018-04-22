exports.run = (client, message, args) => {
    if (!args[0] || isNaN(args[0])) {
        client.no(message, `Utilisation : **\`${message.prefix}isprime <nombre>\`**`);
    } else {
        if (isPrimeNumber(args[0])) {
            client.yes(message, `**${args[0]}** est un nombre premier !`);
        } else {
            client.no(message, `**${args[0]}** n'est pas un nombre premier !`);
        }
    }

    function isPrimeNumber(n) {
        for (var i = 2; i < n; i++) {
          if(n % i === 0) return false;
        }
        return n > 1;
      }
};

exports.config = {
    aliases: ['premier?', 'prime?', 'prime', 'premier'],
    permLevel: 0
};

exports.help = {
    name: 'IsPrime',
    description: 'Savoir si un nombre est un nombre premier.',
    usage: 'isprime <nombre>',
    cat: 'Fun'
};