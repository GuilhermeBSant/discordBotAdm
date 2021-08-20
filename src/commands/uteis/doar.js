const Command = require('../../structures/Command.js')
const { MessageActionRow, MessageButton, Channel } = require('discord.js')
const { MessageEmbed } = require("discord.js")

const actionRow = new MessageActionRow()


module.exports = class doarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'doar',
            description: 'Quer doar para o servidor?',
        })
    }
    run = async (interaction) => {

        const botao1 = new MessageButton()
            .setStyle('LINK')
            .setURL('https://google.com') 
            .setLabel('Padrim')
        const botao2 = new MessageButton()
            .setStyle('LINK')
            .setURL('https://google.com') 
            .setLabel('PIX')
        const botao3 = new MessageButton()
            .setStyle('LINK')
            .setURL('https://google.com') 
            .setLabel('TBATE')   
                 
        const filter = (b) => b.user.id === interaction.user.id    

        const row = new MessageActionRow()
        .addComponents(botao1, botao2, botao3)

        let embed = new MessageEmbed()
        .setTitle(`🎉 | Doação`)
        .setDescription(`💰 **| Escolha abaixo qual opção você deseja doar!**`)
        .setThumbnail('https://i.imgur.com/xL8jgfy.gif')
        .setColor('#F7F701')
        .setTimestamp()
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
        
        interaction.reply({  embeds: [embed] , components: [row] })

    }
}