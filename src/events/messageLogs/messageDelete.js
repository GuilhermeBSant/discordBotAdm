const Event = require('../../structures/Event')
const { MessageEmbed, Interaction } = require("discord.js")

module.exports = class extends Event{
    constructor(client){
        super(client,{
            name: 'messageDelete'
        })
    }
    run = async(message) =>{
        const guildDB = await this.client.db.guilds.findById(message.guild.id)

        if (guildDB?.log) {
    
        const logChannel = message.guild.channels.cache.get(guildDB.log.channel)
        let embed = new MessageEmbed()
        .setTitle('❗ | Uma mensagem foi deletada!')
        .setDescription(`**O usuário ${message.author.tag} deletou uma mensagem em ${message.channel}**`)
        .addField(`Conteúdo: `, message.content, true)
        .setColor('RED')
        

        if (message.author.id === this.client.user.id) return;
       if(!logChannel)return interaction.reply("❗ | Canal de logs do bot não definido!");
        logChannel.send({ embeds: [embed] })
        }
    }
}