const Command = require('../../structures/Command.js')

module.exports = class slowmodeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slowmode',
            description: 'Deixa um canal de texto em modo lento com tempo determinado por mensagem!',
            options: [
                {
                    name: 'duração',
                    type: 'INTEGER',
                    description: 'Tempo que o usuário vai poder enviar mensagens em segundos.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply("❗ | Você não tem permissão para usar esse comando!")

        let duration = interaction.options.getInteger('duração')

        interaction.channel.setRateLimitPerUser(duration)
        if (duration === 1) return interaction.reply(`✅ | Mensagens agora só poderão ser enviadas a cada ${duration} segundo.`).then(() => setTimeout(() => interaction.deleteReply(), 5000))
        interaction.reply(`✅ | Mensagens agora só poderão ser enviadas a cada ${duration} segundos.`).then(() => setTimeout(() => interaction.deleteReply(), 5000))
    }
}

