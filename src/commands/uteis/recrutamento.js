const Command = require('../../structures/Command.js')
const { MessageEmbed } = require("discord.js")

module.exports= class PingCommand extends Command{
    constructor(client){
        super(client,{
            name: 'recrutamento',
            description: 'Faz o bot te explicar como funcionar o recrutamento aqui no servidor!'
        } )
    }

    run = async(interaction) => {

        /* const tradutor = `:white_check_mark:`
        const rev = `:sunglasses:`
        const ts = `:thumbsup:`
        const cr = `:confused:` */

        let embed = new MessageEmbed()
        .setTitle(`**Recrutamento | Reaper Scans Brasil**`)
        .setColor(`YELLOW`)
        .setAuthor(`Reaper Scans BR`, `https://i.imgur.com/86yaYKx.png`, `https://discord.gg/yVEkq5ZjW9`)
        .setThumbnail(`https://i.imgur.com/Mzh3ZVE.gif`)
        .setDescription(`**Tradução:**
        Atualmente recrutamos tradutores **apenas do inglês para português**!
        **Requisitos**: Nível de inglês, no mínimo, intermediário (B1–B2). Se tiver algum certificado comprovando seu conhecimento é melhor ainda e pode facilitar sua passagem pelo treino.
        
        **Edição:**
        **Typer**: Saber uma boa parte da área em que está, como verticalização, centralização horizontal, posição, customização do texto (degradê, mascara, entre outros) e etc.
        **Redrawer/cleaner**: O que mais pedimos é paciência e vontade de fazer. Dominar as funções básicas para a área é essencial.
        **Requisitos**: Tempo livre e, como dito acima, paciência. De preferência utilize o Photoshop.
        
        **Revisão:**
        Domine com proficiência a língua portuguesa e saiba das suas normas. Não precisa ser um formado em Letras, mas pelo menos domine a gramática bem.
        **Requisitos**: O cargo exige ótima atenção e opcionalmente um conhecimento básico de inglês.
        
        **OBS.: a correção do teste e a tomada de decisão pode vir a demorar, afinal, nós não podemos fazer tudo de uma vez.**

        *Reaja com 📕 para o teste de tradução, 📗 para revisão, 📘 para typesseting, 📙 para redraw e clean.*
        
        Testes de tradução: <@461050292473954305>
        Testes de revisão: <@684091653643960515>
        Testes de typesseting: <@233286444083314699>
        Testes de clean e redraw: <@345938621137944577>
        **------------------------------------------------------------------------**
        Qualquer erro/bug relacionado ao bot contate o dev: <@223545327611936778>`)
        .setTimestamp()
        .setFooter(
            ' © ReaperScansBR',
            'https://imgur.com/86yaYKx.png'
        )
        const dm = await interaction.user.send({ embeds: [embed], fetchReply: true  })
        dm.react(`📕`)
        dm.react(`📗`)
        dm.react(`📘`)
        dm.react(`📙`)

        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍' && user.id === message.author.id;
        };

        const collector = interaction.createReactionCollector({ filter, time: 15000 });

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });
        
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });






        const msg = await interaction.reply({ content: `✅ | Verifique sua DM!`, fetchReply: true })
        setTimeout(() => interaction.deleteReply(), 3000)
       // msg.react('✅')
       
    }
    
}

