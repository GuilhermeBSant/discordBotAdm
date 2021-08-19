const Event = require('../../structures/Event')
const { MessageEmbed } = require("discord.js")

module.exports = class extends Event {
    constructor(client){
        super(client,{
            name: 'guildMemberAdd'
        })
    }
    run = ((member) => {
    const channelId = '877008775083589682' // welcome channel
    const targetChannelId = '874042756497018970' // rules and info
  


        let embed = new MessageEmbed()

        .setTitle(`Bem vindo, ${member.user.username}#${member.user.discriminator}!`)
        .setDescription(`🎉 | Seja bem vindo(a) à ${member.guild.name}`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png `)
        .setColor('#FFC83D')
        .addFields(
        {name: `**👋 Você sabia que...**`,value: `Você é o ${member.guild.memberCount}º membro aqui no servidor?`, inline:true},
        {name: `**🎲 Precisando de ajuda?**`, value:`Caso você tenha alguma dúvida ou problema, chame a nossa equipe!`, inline:true}
        )
        .addField('👮‍♂️ Evite punições!',`Para evitar punições visite o canal ${member.guild.channels.cache.get(targetChannelId).toString()}`)
        .setTimestamp()
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
  
      const channel = member.guild.channels.cache.get(channelId)
      channel.send({ embeds: [embed] })

})
  }