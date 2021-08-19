const Event = require('../../structures/Event')
const { MessageEmbed } = require("discord.js")

module.exports = class extends Event{
    constructor(client){
        super(client,{
            name: 'messageUpdate'
        })
    }
    run = async(oldMessage, newMessage) =>{
        let embed = new MessageEmbed()
        .setTitle('🎫 | Uma mensagem foi editada!')
        .setDescription(`**O usuário ${oldMessage.author.tag} modificou uma mensagem em ${oldMessage.channel}**`)
        .addField(`Conteúdo antigo: `, oldMessage.content, true)
        .addField(`Conteúdo novo: `, newMessage.content, true)
        .setColor('PURPLE')
        let channel = newMessage.guild.channels.cache.find(ch=>ch.id==="876584924948353044")
        if(!channel)return;
        channel.send({ embeds: [embed] })
    }
}