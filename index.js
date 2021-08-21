import TelegramBot from 'node-telegram-bot-api'
import config from "./config.js";
import postgres from "./modules/pg.js";
import Commands from "./commands/index.js"

const TOKEN = config.TOKEN

const bot = new TelegramBot(TOKEN, {
    polling: true
})

bot.on('message', async (message) => {
    try {
        let db = await postgres()

        await Commands.botStart(bot, db, message)
        await Commands.botRandom(bot, db, message)
        await Commands.newVoice(bot, db, message)

    } catch (e) {
        console.log(e)
    }
})