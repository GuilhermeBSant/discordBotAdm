const Event = require('../../structures/Event')
const { MessageEmbed } = require("discord.js")

module.exports = class extends Event{
    constructor(client){
        super(client,{
            name: 'messageUpdate'
        })
    }
    run = async(oldMessage, newMessage) =>{
        const guildDB = await this.client.db.guilds.findById(oldMessage.guild.id)

        if (guildDB?.log) {
    
        const logChannel = oldMessage.guild.channels.cache.get(guildDB.log.channel)

        let embed = new MessageEmbed()
        .setTitle('🎫 | Uma mensagem foi editada!')
        .setDescription(`**O usuário ${oldMessage.author.tag} modificou uma mensagem em ${oldMessage.channel}**`)
        .addField(`Conteúdo antigo: `, oldMessage.content, true)
        .addField(`Conteúdo novo: `, newMessage.content, true)
        .setColor('PURPLE')

        if (newMessage.author.id === this.client.user.id) return;
        if(!logChannel)return interaction.reply("❗ | Canal de logs do bot não definido!");
        logChannel?.send({ embeds: [embed] })
        }
    }
}