import Bot from '../base/Bot';
import Event from '../base/Event';
import Logger from '../util/Logger';

export default class Ready extends Event {
    constructor(bot: Bot) {
        super(bot, 'ready')
    }

    async run() {
        Logger.log('Bot is fully loaded.', 'ready');
    }
}