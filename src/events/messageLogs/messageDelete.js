const Event = require('../../structures/Event')
const { MessageEmbed } = require("discord.js")

module.exports = class extends Event{
    constructor(client){
        super(client,{
            name: 'messageDelete'
        })
    }
    run = async(member) =>{
        let embed = new MessageEmbed()
        .setTitle('❗ | Uma mensagem foi deletada!')
        .setDescription(`**O usuário ${member.author.tag} deletou uma mensagem em ${member.channel}**`)
        .addField(`Conteúdo: `, member.content, true)
        .setColor('RED')
        
        let channel = member.guild.channels.cache.find(ch=>ch.id==="876584924948353044")
        if(!channel)return;
        channel.send({ embeds: [embed] })
    }
}