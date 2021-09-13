module.exports = (client, interaction) => {

    const channel = interaction.options.getChannel('canal')

    if (channel.type !== 'GUILD_TEXT') return interaction.reply({ content: '❗ | Informe um canal de texto!'}).then(() => setTimeout(() => interaction.deleteReply(), 5000)) 

    if (interaction.guild.db.rules) interaction.guild.db.rules.channel = channel.id
    else interaction.guild.db.rules = { channel: channel.id }

    interaction.guild.db.save()

    interaction.reply({ content: '✅ | Canal setado com sucesso!'}).then(() => setTimeout(() => interaction.deleteReply(), 5000)) 
}