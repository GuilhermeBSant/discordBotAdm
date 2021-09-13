const Event = require('../../structures/Event')
const { MessageEmbed } = require("discord.js")

module.exports = class extends Event {
    constructor(client){
        super(client,{
            name: 'guildMemberAdd'
            
        })
    }
    run = async(member) => {
    const guildDB = await this.client.db.guilds.findById(member.guild.id)


    if (guildDB?.welcome) {

        const welcomeChannel = member.guild.channels.cache.get(guildDB.welcome.channel)
        const rulesChannel = member.guild.channels.cache.get(guildDB.rules.channel)

        let embed = new MessageEmbed()

        .setTitle(`Bem vindo, ${member.user.username}#${member.user.discriminator}!`)
        .setDescription(`🎉 | Seja bem vindo(a) à ${member.guild.name}`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png `)
        .setColor('#FFC83D')
        .addFields(
        {name: `**👋 Você sabia que...**`,value: `Você é o ${member.guild.memberCount}º membro aqui no servidor?`, inline:true},
        {name: `**🎲 Precisando de ajuda?**`, value:`Caso você tenha alguma dúvida ou problema, chame a nossa equipe!`, inline:true}
        )
        .addField('👮‍♂️ Evite punições!',`Para evitar punições visite o canal ${rulesChannel}`)
        .setTimestamp()
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
  
      //const channel = member.guild.channels.cache.get(channelId)
      welcomeChannel?.send({ embeds: [embed] })

        }
}
  }