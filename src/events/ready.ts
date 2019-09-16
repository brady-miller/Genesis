import Bot from '../base/bot';
import Event from '../base/event';
import Logger from '../util/Logger';

export default class Ready extends Event {
    constructor(bot: Bot) {
        super(bot, 'ready')
    }

    async run() {
        Logger.log('Bot is fully loaded.', 'ready');
    }
}