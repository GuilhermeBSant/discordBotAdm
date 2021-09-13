const ms = require('ms');
const discord = require('discord.js')
const Command = require('../../structures/Command.js')

module.exports = class muteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            description: 'Muta algum usuário!',
            options: [
                {
                    name: 'alvo',
                    type: 'USER',
                    description: 'Quem vai ser punido.',
                    required: true
                },
                {
                    name: 'motivo',
                    type: 'STRING',
                    description: 'Qual motivo da punição?',
                    required: true
                },
                {
                    name: 'duração',
                    type: 'STRING',
                    description: 'Tempo que o usuário ficará mutado.',

                }


            ]

        })
    }
    run = async (interaction, args) => {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply("❗ | Você não tem permissão para usar esse comando!");

        const guildDB = await this.client.db.guilds.findById(interaction.guild.id)
        
        if (guildDB?.log) {

        const logChannel = interaction.guild.channels.cache.get(guildDB.log.channel)    
    
        if(!logChannel)return interaction.reply("❗ | Canal de logs do bot não definido!");
        const target = interaction.guild.members.cache.get(interaction.options.getUser('alvo').id)

        if (target.id === interaction.user.id) return interaction.reply("❗ | Você não pode se mutar!")


        let reason = interaction.options.getString('motivo')

        const mutedrole = interaction.guild.roles.cache.get(guildDB.muted.role)    


        if (target.roles.cache.some(r => r.name === "Mutado")) {
            return interaction.reply("❗ | O usuário já está mutado!");
        }

        const duracao = interaction.options?.getString('duração') || null
        const time = timeToMilliseconds(duracao)

        if (duracao) {

            let embed = new discord.MessageEmbed()

                .setTitle("Usuário mutado!")
                .addField("Alvo:", target.toString())
                .addField("Moderator", interaction.user.tag)
                .addField("Motivo:", reason)
                .addField("Tempo:", duracao)
                .setFooter(
                    ' © ReaperScansBR',
                    'https://imgur.com/86yaYKx.png'
                )
                await logChannel?.send({ embeds: [embed] })
                interaction.reply(`✅ | Usuário mutado com sucesso por ${duracao}!`).then(() => setTimeout(() => interaction.deleteReply(), 5000))    
            setTimeout(function () {
                target.roles.add(mutedrole)
            })
            setTimeout(() => {
                target.roles.remove(mutedrole)
            }, time)

        } else {

            let embed = new discord.MessageEmbed()

                .setTitle("Usuário mutado!")
                .addField("Alvo:", target.toString())
                .addField("Moderator", interaction.user.tag)
                .addField("Motivo:", reason)
                .setFooter(
                    ' © ReaperScansBR',
                    'https://imgur.com/86yaYKx.png'
                )
            await logChannel?.send({ embeds: [embed] })
            interaction.reply('✅ | Usuário mutado com sucesso!').then(() => setTimeout(() => interaction.deleteReply(), 5000))    
            target.roles.add(mutedrole)
            }
        }
    }
}
function timeToMilliseconds(time) {
    if (!time) return;
    const timeUnits = time.replace(/[\d\s]/g, _ => '').toLowerCase().split('')
    const formats = ['d', 'h', 'm', 's']

    const isValid = timeUnits.length === new Set(timeUnits).size && timeUnits.every((u, i, a) => formats.includes(u) && formats.indexOf(a[i - 1]) < formats.indexOf(u))
    if (!isValid) return null

    const formatted = time.replace(/([a-zA-Z])/g, '$1 ').toLowerCase().trim().split(' ').filter(f => !!f)
    if (formatted.some(e => !/[0-9]/.test(e))) return null

    const invalid = { h: 24, m: 60, s: 60 }
    for (const f of formatted) {
        const value = f.replace(/\D/g, '')
        const unit = f.replace(/\d/gi, '')

        if (value >= invalid[unit]) return null
    }

    const convertions = { d: 86_400_000, h: 3_600_000, m: 60_000, s: 1000 }

    return formatted.reduce((acc, curr, i, a) => acc + parseInt(curr.substring(0, curr.length - 1)) * convertions[curr[curr.length - 1]], 0)
}