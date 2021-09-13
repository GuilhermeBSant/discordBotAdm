const Event = require('../../structures/Event')
const { MessageEmbed } = require("discord.js")

module.exports = class extends Event {
    constructor(client){
        super(client,{
            name: 'guildMemberRemove'
        })
    }
    run = async(member) => {
    const channelId = '876584924948353044' // logs channel
    const guildDB = await this.client.db.guilds.findById(member.guild.id)

    if (guildDB?.log) {

        const logChannel = member.guild.channels.cache.get(guildDB.log.channel)


        let embed = new MessageEmbed()

        .setTitle(`Tchau, ${member.user.username}#${member.user.discriminator}!`)
        .setDescription(`🤧 | Foi um prazer te ter no ${member.guild.name}`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png `)
        .setColor('RED')
        .setTimestamp()
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
  
      const channel = member.guild.channels.cache.get(channelId)
      logChannel.send({ embeds: [embed] })

}
}
  }