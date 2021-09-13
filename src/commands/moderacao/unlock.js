const Command = require('../../structures/Command.js')
const { MessageEmbed } = require("discord.js")

module.exports= class unlockCommand extends Command{
    constructor(client){
        super(client,{
            name: 'unlock',
            description: 'Abre canais para o público geral!'         
        } )
    }

    run = async(interaction) => {
        if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply("❗ | Você não tem permissão para usar esse comando!")
        const channel = interaction.channel
        const role = interaction.guild.roles.cache.get('872683691242053693')
        const SEND_MESSAGES = interaction.channel.permissionsFor(role.id).has('SEND_MESSAGES')
        if(SEND_MESSAGES===true) return interaction.reply("❗ | O canal já está aberto!")
        let embed = new MessageEmbed()
        .setTitle("🔓 | Canal aberto!")
        .setDescription(`Esse canal foi aberto por ${interaction.user.tag}`)
        .setColor('#FFC83D')
        .setTimestamp()
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
        channel.permissionOverwrites.edit(role, {
            SEND_MESSAGES: true
        })
        await interaction.reply({ embeds: [embed] }).then(() => setTimeout(() => interaction.deleteReply(), 5000))
    }
}
