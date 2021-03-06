const Command = require('../../structures/Command.js')

module.exports = class clearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'limpa uma quantidade de mensagens automaticamente!',
            options: [
                {
                    name: 'quantidade',
                    type: 'INTEGER',
                    description: 'Quantidade de mensagens para apagar.',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply("❗ | Você não tem permissão para usar esse comando!");
        const amount = interaction.options.getInteger('quantidade')

        if (!amount) return interaction.reply("❗ | Informe a quantidade de mensagens a ser deletadas!")
        if (isNaN(amount)) return interaction.reply("❗ | Informe um número!")
        // if(parseInt(amount) > 99)return interaction.reply("❗ | Você só pode apagar até 99 mensagens!")
        let msgs = parseInt(amount)

        const interval = setInterval(() => {
            if (msgs > 100) {
                interaction.channel.bulkDelete(100);
                msgs -= 100;
            } else {
                interaction.channel.bulkDelete(msgs);
                clearInterval(interval)
            }
        }, );
        //await interaction.channel.bulkDelete(parseInt(amount)+1)
        if (amount === 1) return interaction.reply(`✅ | **${amount}** mensagem deletada com sucesso!`)//.then(() => setTimeout(() => interaction.deleteReply(), 5000))
        interaction.reply(`✅ | **${amount}** mensagens deletadas com sucesso!`)//.then(() => setTimeout(() => interaction.deleteReply(), 3000))

    }
}

