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

        const user = interaction.options.getUser('usuário')
        if (interaction.user.id === user.id) return interaction.reply({ content: '❗ | Você não pode se desbanir.', ephemeral: true })

        const member = interaction.guild.members.cache.get(user.id)

        const channel = interaction.guild.channels.cache.find(c => c.id === '876644562347626537');

        let embed = new MessageEmbed()

        .setTitle("Usuário desbanido!")
        .addField("Alvo:", user.username)
        .addField("Moderator", interaction.user.tag)
        .setColor('GREEN')
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )

        interaction.guild.members.unban(user)
        .then(async() => 
        await channel.send({ embeds: [embed] }),
        interaction.reply(`✅ | Usuário \`${user.tag}\` desbanido com sucesso!`)
    )
            .catch(() => interaction.reply({ content: '❗ | Erro ao desbanir o usuário!', ephemeral: true }))
    }
}