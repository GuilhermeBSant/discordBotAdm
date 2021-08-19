const Command = require('../../structures/Command.js')
const { MessageEmbed } = require("discord.js")

module.exports= class AvatarCommand extends Command{
    constructor(client){
        super(client,{
            name: 'avatar',
            description: 'Olhe o avatar de algum membro!',
            options: [
                {
                    name: 'membro',
                    type: 'USER',
                    description: 'De quem você vai pegar o avatar?.',
                    required: true
                }
            ]
        } )
    }
    run = async(interaction) => {
        const user = interaction.options.getUser('membro') || interaction.author || client.users.cache.get(u => u.id === args[0])
        const username = user.username
        const avatar = user.displayAvatarURL({ size: 4096, dynamic: true})
        let embed = new MessageEmbed()
        .setTitle(`Avatar de ${username}`)
        .setImage(avatar)
        .setTimestamp()
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
        interaction.reply({ embeds: [embed] })
    }
}