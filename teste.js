const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'aprovar',
            description: 'Comando feito para aprovar um jogador no formulário.',
            options: [
                {
                    name: 'Id do usuário',
                    type: 'STRING',
                    description: 'Id do usuário aprovado.',
                    required: true
                }
            ]
        })
    }

    run= async (client, message, args) => {
        var membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
            if (!message.member.hasPermission('MANAGE_GUILD')) return message.lineReply(new Discord.MessageEmbed()
        .setColor("#06A2F5")
        .setDescription(`Você não tem a permissão: \`Gerenciar Servidor\``))
    
       const Embd1 = new Discord.MessageEmbed()
    
       .setTitle(``)
       .setDescription(`✅ | Usuário aprovado com sucesso.`)
       .setColor('#06A2F5')
       .setFooter(``)
    
       message.lineReply(``,Embd1)
    
        let fab_msg = args.join(" ");
        const dm = new Discord.MessageEmbed()
      .setTitle(`Resultado do Formulário`)
      .setColor('#06A2F5')
      .setFooter(`Mensagem enviada pelo servidor ${message.guild.name}`)
      .setDescription(`Olá, ${membro}. Parabéns, o senhor acaba de passar no formulário para a equipe ZhoenixMC, pedimos que mantenha sigilo total de coisas relacionadas a nossa equipe, pedimos também que entre em nosso discord de aprovados para que possamos continuar as etapas restantes: https://discord.gg/gB93DqS4VS`)
      membro.send(dm);
    }
    } 