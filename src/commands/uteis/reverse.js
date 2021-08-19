const Command = require('../../structures/Command.js')

module.exports= class reverseCommand extends Command{
    constructor(client){
    super(client,{
        name: 'reverse',
        description: 'Deixa o texto ao contrário!',
        options:[
            {
                    name: 'texto',
                    type: 'STRING',
                    description: 'Texto que vai ser modificado.',
                    required: true
            }
        ]
    })
}
run = async(interaction) => {
    const text = interaction.options.getString('texto')
    let Rarray = text.split("")
    let reverseArray = Rarray.reverse()
    let result = reverseArray.join("")
    interaction.reply(result)
}
}