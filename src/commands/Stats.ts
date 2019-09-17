import Command from '../base/Command';
import { version } from 'discord.js';
import moment from 'moment';
import Bot from '../base/Bot';
import 'moment-duration-format';

class Stats extends Command {
    constructor(bot: Bot) {
        super(bot, {
            help: {
                name: 'stats',
                description: 'Gets the current bot statistics',
                category: 'info'
            },
            conf: {
                aliases: ['statistics', 'uptime'],
                perms: {}
            }
        })
    }

    public async run(message: Message): Promise<Message> {
        try {
            const duration = moment.duration(this.bot.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
        }
    }
}