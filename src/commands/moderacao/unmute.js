const discord = require('discord.js')
const Command = require('../../structures/Command.js')

module.exports= class muteCommand extends Command{
    constructor(client){
        super(client,{
            name: 'unmute',
            description: 'Desmuta algum usuário!',
            options: [
                {
                    name: 'alvo',
                    type: 'USER',
                    description: 'Quem vai ser desmutado.',
                    required: true
                }                
            ]
            
        } )
    }
    run = async(interaction) => {
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply("❗ | Você não tem permissão para usar esse comando!");

        const guildDB = await this.client.db.guilds.findById(interaction.guild.id)
        
        if (guildDB?.log) {

        const logChannel = interaction.guild.channels.cache.get(guildDB.log.channel)
        if(!logChannel)return interaction.reply("❗ | Canal de logs do bot não definido!");

        const target = interaction.guild.members.cache.get(interaction.options.getUser('alvo').id)

        const mutedrole = interaction.guild.roles.cache.get(guildDB.muted.role) 

        if(!mutedrole) return interaction.reply("❗ | Não consegui achar a role `Mutado`!")

        if(target.roles.cache.some(r => mutedrole)) {
            return interaction.reply("❗ | O usuário já está desmutado!").then(() => setTimeout(() => interaction.deleteReply(), 5000))    ;
        }

        let embed = new discord.MessageEmbed()
        
        .setTitle("Usuário desmutado!")
        .setColor("GREEN")
        .addField("Alvo:", target.toString())
        .addField("Moderator", interaction.user.tag)
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
        await logChannel.send({ embeds: [embed] })
        interaction.reply('✅ | Usuário desmutado com sucesso!').then(() => setTimeout(() => interaction.deleteReply(), 5000))    
        target.roles.remove(mutedrole)

        }
    }
}