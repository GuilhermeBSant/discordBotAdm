const Command = require('../../structures/Command.js')

module.exports= class PingCommand extends Command{
    constructor(client){
        super(client,{
            name: 'ping',
            description: 'Mostra o ping do bot'
        } )
    }

    run = (interaction) => {
        interaction.reply({
            content: `🏓 | O ping do bot é: \`${this.client.ws.ping}\`ms.`,
            ephemeral: true
        })
    }
}

