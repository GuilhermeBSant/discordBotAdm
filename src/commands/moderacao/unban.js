const Command = require('../../structures/Command')

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            description: 'Besbane um usuário do servidor.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a ser banido.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: '❗ | Você precisa de permissão para banir membros no servidor.', ephemeral: true })

        const guildDB = await this.client.db.guilds.findById(interaction.guild.id)
        
        if (guildDB?.log) {

        const logChannel = interaction.guild.channels.cache.get(guildDB.log.channel)
        if(!logChannel)return interaction.reply("❗ | Canal de logs do bot não definido!");

        const user = interaction.options.getUser('usuário')
        if (interaction.user.id === user.id) return interaction.reply({ content: '❗ | Você não pode se desbanir.', ephemeral: true })

        const member = interaction.guild.members.cache.get(user.id)


        let embed = new MessageEmbed()

        .setTitle("Usuário desbanido!")
        .addField("Alvo:", user.toString())
        .addField("Moderator", interaction.user.tag)
        .setColor('GREEN')
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
        const unbanned = !(await interaction.guild.bans.fetch()).get(user.id)

        if (unbanned) return interaction.reply('❗ | O usuário não está banido!').then(() => setTimeout(() => interaction.deleteReply(), 5000))    
        interaction.guild.members.unban(user)
        .then(async() => 
        await logChannel.send({ embeds: [embed] }),
        interaction.reply(`✅ | Usuário \`${user.tag}\` desbanido com sucesso!`).then(() => setTimeout(() => interaction.deleteReply(), 5000))    
    )
            .catch(() => interaction.reply({ content: '❗ | Erro ao desbanir o usuário!', ephemeral: true }))
        }
    }
}