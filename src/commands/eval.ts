import Command from '../base/command';
import Bot from '../base/bot';
import { Message } from 'discord.js';

export default class Eval extends Command {
    constructor(bot: Bot) {
        super(bot, {
            help: {
                name: 'eval',
                description: 'Evaluates arbitrary Javascript',
                category: 'system'
            },
            conf: {
                aliases: ['evaluate', 'execute'],
                perms: {
                    user: ['ADMINISTRATOR']
                }
            }
        })
    }

    async run(message: Message, args: string[]): Promise<Message> {
        const code: string = args.join(" ")

        try {
            const evaled = eval(code);
            const cleaned = await this.bot.clean(evaled);
            const MAX_CHARS: number = 3 + 2 + cleaned.length + 3;
            if (MAX_CHARS > 2000) {
                return await message.channel.send("Output exceeded 2000 characters. Sending as a file.", { files: [{ attachment: Buffer.from(cleaned), name: "output.txt" }] }) as Message;
            }
            return message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``) as Promise<Message>;
        } catch(error) {
            return message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.bot.clean(error)}\n\`\`\``) as Promise<Message>;
        }
    }
}