import Command from "../base/command";
import Bot from "../base/bot";
import { Message } from "discord.js";
import Logger from '../util/Logger';


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
            Logger.log('Test log')
            return reply.edit(`**Ping:** ${reply.createdTimestamp - message.createdTimestamp} ms`)
        } catch (error) {
            Logger.error(error)
            return await message.channel.send('Unknown Error Occured') as Message;
        }

    }
}