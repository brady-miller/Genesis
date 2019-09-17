import Bot from '../base/Bot';
import { Message, PermissionResolvable } from 'discord.js';

// Command Handler function
export default (bot: Bot, message: Message) => {
    // Split message arguments by spaces
    const args = message.content.split(/\s+/g);
    // The command name executed
    const cmd = args.shift()!.slice(bot.config!.prefix.length)
    // The command file to serve the response with
    // @ts-ignore
    const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

    if (message.guild) {
        // Checks if user and bot have permissions required by command
        if (command.userPerms.includes('BOT_OWNER') && message.author.id !== bot.config!.ownerID) return false; 
        if (command.userPerms.some((p: PermissionResolvable) => !message.member.permissions.has(p))) return false;
        if (command.botPerms.some((p: PermissionResolvable) => !message.guild.me.permissions.has(p))) return false;
    } else if (!command.allowDMs) return false; // Checks if DMs are allowed by the command

    try {
        command.run(message, args);
    } catch(error) {
        command.message.channel.send('Unknown error');
    }

    return true;
}