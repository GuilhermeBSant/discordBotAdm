const Command = require('../../structures/Command')

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            description: 'Bane um usuário do servidor.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a ser banido.',
                    required: true
                },
                {
                    name: 'motivo',
                    type: 'STRING',
                    description: 'Motivo do ban.',
                    required: false
                }
            ]
        })
    }

    run = async (interaction) => {
        const guildDB = await this.client.db.guilds.findById(interaction.guild.id)
        
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: '❗ | Você precisa de permissão para banir membros no servidor.', ephemeral: true })
       
        if (guildDB?.log) {

        const logChannel = interaction.guild.channels.cache.get(guildDB.log.channel)
        if(!logChannel)return interaction.reply("❗ | Canal de logs do bot não definido!");
        const user = interaction.options.getUser('usuário')
        if (interaction.user.id === user.id) return interaction.reply({ content: '❗ | Você não pode se banir.', ephemeral: true })

        const member = interaction.guild.members.cache.get(user.id)
        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: '❗ | Você só pode banir membros com cargo abaixo do seu.', ephemeral: true })
        if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({ content: '❗ | Não consigo banir este usuário, o cargo dele não é mais baixo que o meu.', ephemeral: true })

        const reason = interaction.options.getString('motivo') || '❗ | Motivo não especificado.'

        //const channel = interaction.guild.channels.cache.find(c => c.id === '876644562347626537'); ---> Canal Especifico

        let embed = new MessageEmbed()

        .setTitle("Usuário banido!")
        .addField("Alvo:", user.toString())
        .addField("Moderator", interaction.user.tag)
        .addField("Motivo:", reason)
        .setColor('RED')
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )

        interaction.guild.members.ban(user, { reason })
        .then(async() => 
        await logChannel?.send({ embeds: [embed] }),
        interaction.reply(`✅ | Usuário \`${user.tag}\` banido com sucesso!`).then(() => setTimeout(() => interaction.deleteReply(), 5000))    
    )
            .catch(() => interaction.reply({ content: '❗ | Erro ao banir o usuário!', ephemeral: true }))
        }   
    }
}