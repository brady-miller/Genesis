import Bot from '../base/bot';
import Event from '../base/event';

export default class Ready extends Event {
    constructor(bot: Bot) {
        super(bot, 'ready')
    }

    async run() {
        console.log('Bot is fully loaded.')
    }
}