const Command = require('../../structures/Command')

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            description: 'Expulsa um usuário do servidor.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a ser expulso.',
                    required: true
                },
                {
                    name: 'motivo',
                    type: 'STRING',
                    description: 'Motivo da expulsão.',
                    required: false
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply({ content: '❗ | Você precisa de permissão para expulsar membros no servidor.', ephemeral: true })

        const guildDB = await this.client.db.guilds.findById(interaction.guild.id)

        if (guildDB?.log) {
        const logChannel = interaction.guild.channels.cache.get(guildDB.log.channel)
        if(!logChannel)return interaction.reply("❗ | Canal de logs do bot não definido!");

        const user = interaction.options.getUser('usuário')
        if (interaction.user.id === user.id) return interaction.reply({ content: '❗ | Você não pode se expulsar.', ephemeral: true })

        const member = interaction.guild.members.cache.get(user.id)
        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: '❗ | Você só pode expulsar membros com cargo abaixo do seu.', ephemeral: true })
        if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({ content: '❗ | Não consigo expulsar este usuário, o cargo dele não é mais baixo que o meu.', ephemeral: true })

        const reason = interaction.options.getString('motivo') || '❗ | Motivo não especificado.'



        let embed = new MessageEmbed()

        .setTitle("Usuário expulsado!")
        .addField("Alvo:", user.toString())
        .addField("Moderator", interaction.user.tag)
        .addField("Motivo:", reason)
        .setColor('RED')
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )

        interaction.guild.members.kick(user, { reason })
          .then(async() => 
            await logChannel?.send({ embeds: [embed] }),
            interaction.reply(`✅ | Usuário \`${user.tag}\` expulsado com sucesso!`).then(() => setTimeout(() => interaction.deleteReply(), 5000))    
        )
            .catch(() => interaction.reply({ content: '❗ | Erro ao expulsar o usuário!', ephemeral: true }))
        }
    }
}