const Command = require('../../structures/Command.js')
const { MessageEmbed } = require("discord.js");

module.exports= class coinflipCommand extends Command{
    constructor(client){
        super(client,{
            name: 'coinflip',
            description: 'Gira uma moeda.',        
        } )
    }
    run = async(interaction) => {
        const choices= ["Cara", "Coroa"];
        const choice = choices[Math.floor(Math.random() * choices.length)];
        let embed = new MessageEmbed()
        .setTitle("🥏 | Coinflip!")
        .setDescription(`Você tirou **${choice}**!`) 
        .setTimestamp()
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
        interaction.reply({ embeds: [embed] })
    }
}