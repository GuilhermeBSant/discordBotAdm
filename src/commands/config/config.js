const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'config',
            description: 'Configurar dados do servidor no bot.',
            requireDatabase: true,
            options: [
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'welcome',
                    description: 'Configuração do sistema de boas-vindas.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'canal_entrada',
                            description: 'Configurar o canal onde a mensagem de boas-vindas será enviada.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal de texto onde a mensagem será enviada.',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'log',
                    description: 'Configuração do canal de log.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'log_channel',
                            description: 'Configurar o canal de logs do bot.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal de texto onde as mensagens serão enviadas.',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'sugest',
                    description: 'Configuração do canal de sugestões.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'sugest_channel',
                            description: 'Configurar o canal de sugestões do servidor.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal de texto onde as mensagens serão enviadas.',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'rules',
                    description: 'Configuração do canal de regras.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'rules_channel',
                            description: 'Configurar o canal de regras do bot.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal de texto onde as mensagens serão enviadas.',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'muted',
                    description: 'Configuração do cargo mutado.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'muted_role',
                            description: 'Configurar o cargo mutado.',
                            options: [
                                {
                                    type: 'ROLE',
                                    name: 'role',
                                    description: 'Configurar o cargo mutado.',
                                    required: true
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    }

    run = (interaction) => {
        if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({ content: 'Você não tem permissão para utilizar este comando!', ephemeral: true })

        const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/config/${subCommandGroup}/${subCommand}`)(this.client, interaction)
    }
}