exports.run = async (client, message, args) => {
    if (message.author.id !== '350710888812249101') return;

    function clean(text) {
        if (typeof (text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    }

    try {
        const code = args.join(" ");
        let evaled = await eval(code);
        if (typeof evaled !== "string") {
            evaled = require("util").inspect(evaled);
        }
        if (evaled.length > 1990) {
            evaled = evaled.substring(0, 1980);
            evaled += '...'
        }

        message.channel.send(clean(evaled), {
            code: "js"
        });
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
    }
};

exports.config = {
    aliases: ['exec'],
    permLevel: 5
};

exports.help = {
    name: 'Eval',
    description: 'Eval command. OWNER ONLY',
    usage: 'eval <code>',
    category: 'System'
};