const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    _id: String,
    welcome: {
        channel: String
    },
    log: {
        channel: String
    },
    rules: {
        channel: String
    },
    sugest: {
        channel: String
    },
    muted: {
        role: String
    }
})

module.exports = model('guilds', guildSchema)