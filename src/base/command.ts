import Bot from './bot';
import { Message, MessageEmbed } from 'discord.js';

/**
 * Represents a command class
 */
class Command {
    public name: string;
    public description: string;
    public category: string;
    public usage: string;
    public hidden: boolean;

    public aliases: string[];
    public userPerms: string[];
    public botPerms: string[];
    public dmsEnabled: boolean;

    public bot: Bot;
    public message?: Message;

    /**
     * Used to create a new command
     * @param {Bot} bot The client used in the command
     * @param {CommandOptions} CommandOptions The options used in the command 
     */
    constructor(bot: Bot, {help, conf}: CommandOptions) {
        this.bot = bot;

        this.name = help.name;
        this.description = help.description;
        this.category = help.category || 'info';
        this.usage = help.usage || '';
        this.hidden = help.hidden || false;

        this.aliases = conf.aliases || [];
        this.userPerms = conf.perms.user || [];
        this.botPerms = conf.perms.bot || [];
        this.dmsEnabled = !!conf.allowDMs;
    }
}

/**
 * Interface for the command
 */
/*
interface Command {
    bot: Bot;

    name: string;
    description: string;
    category: string;
    usage: string;
    hidden: boolean;

    aliases: string[];
    userPerms: string[];
    botPerms: string[];
    dmsEnabled: boolean;

    message?: Message;
}*/

/**
 * Interface for the command options
 */
export interface CommandOptions {
    readonly help: {
        name: string;
        description: string;
        category: string;
        usage?: string;
        hidden?: boolean;
    };

    readonly conf: {
        aliases?: string[];
        perms: {
            user?: string[];
            bot?: string[];
        }
        allowDMs?: boolean;
    };
}

export default Command;