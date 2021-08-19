const { MessageEmbed } = require('discord.js')
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ideia',
            description: 'Comando feito para sugerir algo.',
            required: true,
            options: [
                {
                    name: 'mensagem',
                    type: 'STRING',
                    description: 'A mensagem que será enviada.',
                    required: true
                }
            ]
        })
    }
    run = async(interaction) => {
        const channel = interaction.guild.channels.cache.find(c => c.id === '875487544928792616');
        const channel2 = interaction.channel
        let messageArgs = interaction.options.getString('mensagem')
        let embed = new MessageEmbed()
        .setColor('ffffff')
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs);

        
        channel.send({ embeds: [embed], fetchReply: true }) 
        .then((msg) =>{
            msg.react('✔️'),
            msg.react('❎'),
            interaction.reply('✅ | Ideia enviada com sucesso!').then(() => setTimeout(() => interaction.deleteReply(), 5000))
             
        }).catch((err)=>{
            throw err;
        });
  
    }
}