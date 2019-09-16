import Command from "../base/command";
import Bot from "../base/bot";
import { Message } from "discord.js";


export default class Ping extends Command {
    constructor(bot: Bot) {
        super(bot, {
            help: {
                name: 'ping',
                description: 'Ping the bot',
                category: 'info'
            },
            conf: {
                aliases: ['pong'],
                perms: {}
            }
        });
    }

    async run(message: Message): Promise<Message> {
        try {
            const reply: Message = await message.channel.send('Pinging...') as Message;
            return reply.edit(`**Ping:** ${reply.createdTimestamp - message.createdTimestamp} ms`)
        } catch (error) {
            return await message.channel.send('Unknown Error Occured') as Message;
        }

    }
}