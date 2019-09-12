// Imports the bot class
import Genesis from './base/bot';
import botConfig from './util/config';

// Initialize the bot
const bot = new Genesis({config: botConfig});

if (bot.config) {
    // Authenticates the bot
    bot.authenticate(bot.config.token);
    // Loads commands and events
    bot.loadCommands(bot.config.paths.commands);
    bot.loadEvents(bot.config.paths.events);
} else {
    // Throws error if bot.config is not found.
    throw new Error('No bot config found.');
}
