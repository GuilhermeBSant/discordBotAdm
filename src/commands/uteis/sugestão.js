const Command = require('../../structures/Command.js')
const { MessageEmbed } = require("discord.js")

module.exports= class lockCommand extends Command{
    constructor(client){
        super(client,{
            name: 'sugestão',
            type:'STRING',
            description: 'Sugere algo para a administração',  
            options:[
                {
                    name:'mensagem',
                    description:'Qual sua sugestão?',
                    type:'STRING',
                    required: true
                }
            ]   
        })
    }

    run = async(interaction) => {

        const guildDB = await this.client.db.guilds.findById(interaction.guild.id)
        const sugestChannel = interaction.guild.channels.cache.get(guildDB.sugest.channel)

        const channel = interaction.guild.channels.cache.find(c => c.id === '875487544928792616');
        const channel2 = interaction.channel
        let messageArgs = interaction.options.getString('mensagem')
        let embed = new MessageEmbed()
        .setColor('FADF2E')
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs);

        
        sugestChannel.send({ embeds: [embed], fetchReply: true }) 
        .then((msg) =>{
            msg.react('👍'),
            msg.react('👎'),
            interaction.reply('✅ | Sugestão enviada com sucesso!').then(() => setTimeout(() => interaction.deleteReply(), 5000))
             
        }).catch((err)=>{
            throw err;
        });
  
    }
}

