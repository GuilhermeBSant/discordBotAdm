const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')
const { connect } = require('mongoose')
const config = require("../../config.json")

module.exports = class extends Client {
    constructor(options) {
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()
    }

    registryCommands() {
        //temporária
        this.guilds.cache.get('872683691242053693').commands.set(this.commands)
        //this.application.commands.set(this.commands)   ---> em sv
    }

    loadCommands(path = "src/commands") {
        const categories = readdirSync(path)

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)


            for (const command of commands) {
                const commandsClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandsClass)(this)

                this.commands.push(cmd)
            }
        }
    }
    loadEvents(path = 'src/events') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`)


            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }

    async connectToDatabase() {
        const connection = await connect(config.mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true

        })
        console.log('Database conectada com sucesso!')

        this.db = { connection }

    }


}