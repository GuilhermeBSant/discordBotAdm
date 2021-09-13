module.exports = (client, interaction) => {
    
    const role = interaction.options.getRole('role')

    if (interaction.guild.db.muted) interaction.guild.db.muted.role = role.id
    else interaction.guild.db.muted = { role: role.id }

    interaction.guild.db.save()

    interaction.reply({ content: '✅ | Role setada com sucesso!'}).then(() => setTimeout(() => interaction.deleteReply(), 5000)) 
    interaction.member.roles.add(role)
}