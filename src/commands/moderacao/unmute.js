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

        const target = interaction.guild.members.cache.get(interaction.options.getUser('alvo').id)
        const channel = interaction.guild.channels.cache.find(c => c.id === '876644562347626537');


        const memberrole = interaction.guild.roles.cache.find(r => r.name === "Nível 0")
        const mutedrole = interaction.guild.roles.cache.find(r => r.name === "Mutado");
        if(!memberrole) return interaction.reply("❗ | Não consegui achar a role `Nível 0`!")
        if(!mutedrole) return interaction.reply("❗ | Não consegui achar a role `Mutado`!")

        if(target.roles.cache.some(r => r.name === "Nível 0")) {
            return interaction.reply("❗ | O usuário já está desmutado!");
        }

        let embed = new discord.MessageEmbed()
        
        .setTitle("Usuário desmutado!")
        .setColor("GREEN")
        .addField("Alvo:", target.user.tag)
        .addField("Moderator", interaction.user.tag)
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
        await channel.send({ embeds: [embed] })
        interaction.reply('✅ | Usuário desmutado com sucesso!')
        target.roles.remove(mutedrole)
        target.roles.add(memberrole)
    }
}