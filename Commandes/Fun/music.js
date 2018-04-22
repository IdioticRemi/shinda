const ytdl = require('ytdl-core');
const Youtube = require('simple-youtube-api');
const {
    RichEmbed
} = require('discord.js');
const ms = require('ms');

exports.run = async(client, message, args, queue) => {
    if (args.length < 1) return client.no(message, `Aucune sous-commande trouvée avec ce nom ! Faites \`${message.prefix}help music\` pour plus d'informations.`);
    const youtube = new Youtube(client.config.API_KEY);
    const serverQueue = queue.get(message.guild.id);
    const voiceChannel = message.member.voiceChannel;
    var searched = args.slice(1).join(' ');
    if (!voiceChannel) return client.no(message, `Vous devez être dans un **channel vocal** pour faire cela !`);
    if (args[0].toLowerCase() === 'play' || args[0].toLowerCase() === 'pl' || args[0].toLowerCase() === 'p') {
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : ''; 
        const permissions = voiceChannel.permissionsFor(client.user);
        if (!permissions.has('CONNECT')) return client.no(message, `Je n'ai pas la permission de me **connecter dans ce channel** !`);
        if (!permissions.has('SPEAK')) return client.no(message, `Je n'ai pas la permission de **parler dans ce channel** !`);

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const vid = await youtube.getVideoByID(video.id);
                await handleVideo(client, message, vid, voiceChannel, queue, true);
            }
            client.yes(message, `La playlist **\`${playlist.title}\`** a été ajoutée à la queue !`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (e) {
                try {
                    var videos = await youtube.searchVideos(searched, 10);
                    let i3 = 0;
                    var channel = message.channel;
                    var msg2 = message;
                    var msg1;
                    message.delete(300);
                    channel.send(`\`\`\`Markdown\n#  Selection du son  #\n\n${videos.map(vid => `<${++i3}> ${vid.title}`).join('\n')}\`\`\``).then(
                        msg => {
                            msg1 = msg;
                        }
                    )
                    try {
                        var response = await channel.awaitMessages(msg => msg.content > 0 && msg.content < 11 && !isNaN(msg.content), {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                        msg1.delete(300)

                    } catch (err) {
                        return client.no(msg2, `Aucun nombre valide entré entre 1 et 10, annulation de la selection.`);
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    response.first().delete(300);
                } catch (er) {
                    console.log(er);
                    return client.no(message, `Je n'ai rien pu trouver qui corresponde à **\`${searched}\`**`);
                }
            }
        }
        await handleVideo(client, message, video, voiceChannel, queue);
    } else if (args[0].toLowerCase() === 'stop') {
        if (!serverQueue) return client.no(message, `Aucune musique n'est en cours !`);
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end(`La musique a été arrêtée par **\`${message.author.tag}\`** !`);
        message.delete(300);
    } else if (args[0].toLowerCase() === 'skip') {
        if (!serverQueue) return client.no(message, `Aucune musique n'est en cours !`);
        serverQueue.connection.dispatcher.end(`Passage à la musique suivante par **\`${message.author.tag}\`** !`);
        message.delete(1000);
    } else if (args[0].toLowerCase() === 'playing' || args[0].toLowerCase() === 'np' || args[0].toLowerCase() === 'now') {
        if (!serverQueue) return client.no(message, `Aucune musique n'est en cours !`);
        client.yes(message, `La musique actuelle est **${serverQueue.songs[0].title}**`);
        message.delete(300);
    } else if (args[0].toLowerCase() === 'volume' || args[0].toLowerCase() === 'vol' || args[0].toLowerCase() === 'v') {
        if (!serverQueue) return client.no(message, `Aucune musique n'est en cours !`);
        if (!args[1]) return message.channel.send(`🔊 Le volume actuel est de **${serverQueue.volume} %**`);
        if (isNaN(args[1]) || parseInt(args[1]) > 200) return client.no(message, `Veuillez entrer un nombre entre **0 et 200** !`);
        serverQueue.connection.dispatcher.setVolumeLogarithmic(parseInt(args[1]) / 100);
        serverQueue.volume = parseInt(args[1]);
        client.yes(message, `Le volume à été défini à **${args[1]} %** par **\`${message.author.tag}\`** !`);
        message.delete(300);
    } else if (args[0].toLowerCase() === 'queue' || args[0].toLowerCase() === 'q') {
        var q = '';
        let dur;
        let realtime;
        if (serverQueue) {
            var i = 1;
            while (i <= 8) {
                if (serverQueue.songs[i]) {
                    let t = serverQueue.songs[i].duration;
                    if (t.length = 4) t = `0${t}`
                    q += `<${i}> ` + serverQueue.songs[i].title + ` <${t}>\n`;
                }
                i++;
            }
            dur = serverQueue.songs[0].duration;
            if (dur.length <= 4) dur = `0${dur}`;
            if (dur.length == 4) dur = dur.replace(':', ' ').split(' ')[0] + ':0' + dur.replace(':', ' ').split(' ')[1]
            let time = `${Math.floor(ms(ms(serverQueue.connection.dispatcher.time / 1000, {long: true})))}`;
            if (time.length == 1) time = `0${time}`;
            realtime = `0:${time}`;
            let i1 = 1;
            while (parseInt(time) >= 60) {
                time = parseInt(time - 60);
                if (`${parseInt(time)}`.length == 1) time = `0${time}`;
                realtime = `${i1}:${time}`;
                i1++;
            }
            if (realtime.length <= 4) realtime = `0${realtime}`;
        }
        let embed = new RichEmbed().setColor(0x41c4f4);
        let s = ``
        if (serverQueue) s = serverQueue.songs[0].title + ` <${realtime}/${dur}>`;
        else s = `#  Aucune musique en cours !  #`
        embed.addField(`En cours`, `\`\`\`Markdown\n${s}\`\`\``);
        if (q == ``) embed.addField(`Queue`, `\`\`\`Markdown\n#  Aucun son à venir !  #\`\`\``);
        else embed.addField(`Queue`, `\`\`\`Markdown\n${q}\`\`\``);
        message.channel.send(embed);
    } else if (args[0].toLowerCase() === 'pause') {
        if (!serverQueue) return client.no(message, `Aucune musique n'est en cours !`);
        if (!serverQueue.playing) return client.no(message, `La musique est déja en pause !`);
        client.yes(message, `La musique a été **mise en pause** par **${message.author.tag}** !`);
        message.delete(300);
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
    } else if (args[0].toLowerCase() === 'resume') {
        if (!serverQueue) return client.no(message, `Aucune musique n'est en cours !`);
        if (serverQueue.playing) return client.no(message, `La musique est déja en cours !`);
        client.yes(message, `La musique a été **relancée** par **${message.author.tag}** !`);
        message.delete(300);
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
    } else {
        client.no(message, `Aucune sous-commande trouvée avec ce nom ! Faites \`${message.prefix}help music\` pour plus d'informations.`);
    }
}

async function handleVideo(client, message, video, voiceChannel, queue, playlist = false) {
    let serverQueue = queue.get(message.guild.id);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        duration: `${video.duration.minutes}:${video.duration.seconds}`
    }
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 75,
            playing: true
        }
        queueConstruct.songs.push(song);
        queue.set(message.guild.id, queueConstruct);
        try {
            var connection = await voiceChannel.join();
            let serverQueue = queue.get(message.guild.id);
            serverQueue.connection = connection;
            play(client, message, serverQueue.songs[0]);
        } catch (e) {
            queue.delete(message.guild.id);
            console.log(e);
            return client.no(message, `Une erreur est survenue lors de **ma connection** au channel !`);
        }
    } else {
        serverQueue.songs.push(song);
        if (!playlist) client.yes(message, `La musique **${song.title}** à bien été ajoutée à la queue !`);
    }
}

play = async function (client, message, song) {
    const serverQueue = client.queue.get(message.guild.id);
    if (!song) {
        client.queue.get(message.guild.id).voiceChannel.leave();
        return client.queue.delete(message.guild.id)
    };
    client.yes(message, `La musique **${song.title}** va commencer !`);
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {
            audioOnly: true
        }))
        .on('end', (raison) => {
            if (raison == 'Stream is not generating quickly enough.') raison = `La musique **${song.title}** s'est terminée !`;
            if (!raison) raison = `La musique **${song.title}** s'est terminée !`;
            client.yes(message, raison);
            serverQueue.songs.shift();
            play(client, message, serverQueue.songs[0]);
        })
        .on('error', e => console.log(e));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
}

exports.config = {
    aliases: ['musique', 'm'],
    permLevel: 0
};

exports.help = {
    name: 'Music',
    description: 'Jouer de la musique dans votre channel.',
    usage: 'music <play|skip|stop|playing|queue|volume|pause|resume> [args...]',
    cat: 'Fun'
};