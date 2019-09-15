import Bot from '../base/bot';
import Event from '../base/event';

import Discord from 'discord.js';

/**
 * The event that handles a message received through the discord api
 */
export default class Message extends Event {
    constructor(bot: Bot) {
        super(bot, 'message');

        this.addHandler('commandHandler', (message: Discord.Message): boolean => {
            // Check for guild availability
            if (message.guild && !message.guild.available) return false;
            // Check if the message starts with the prefix
            if (!message.content.startsWith(this.bot.config!.prefix)) return false;
            // Other checks
            if (!message.author) return false;
             // Split message arguments by spaces
             const args = message.content.split(/\s+/g);
             const cmd = args.shift()!.slice(this.bot.config!.prefix.length);
             // @ts-ignore
             const command = this.bot.commands.get(cmd) || this.bot.commands.get(this.bot.aliases.get(cmd));
             
             // Check if a command was found
             if (!command) return false;
             
             // Run handler
             return true;
        });
    }

    async run() {
        
    }
}