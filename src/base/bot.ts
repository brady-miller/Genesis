import { Client, Collection, ClientOptions, DiscordAPIError } from 'discord.js';
import { readdir, fstat } from 'fs';
import IOptions from '../types/IOptions';
import IConfig from '../types/IConfig';
import IPerms from '../types/IPerms';
import Command from './Command';
import Event from './Event';
import Path from 'path';
import Logger from '../util/Logger';

/**
 * The modified discord client
 */
export default class Bot extends Client {
    public commands: Collection<string, Command>;
    public aliases: Collection<string, String>;
    public config?: IConfig;
    public perms: IPerms;

    /**
     * @param {IOptions} options The options passed to the client
     * @param {ClientOptions} options.clientOptions The client options used by discord
     * @param {IConfig} options.config The file location of the config
     * @param {IPerm} options.perms The permission levels file
     */
    constructor(options: IOptions) {
        super(options.clientOptions || {});

        /**
         * A collection of all the bot's commands
         * @type {Collection}
         */
        this.commands = new Collection();

        /**
         * A collection of all the bot's command aliases
         * @type {Collection}
         */
        this.aliases = new Collection

        /**
         * Bot config
         * @type {IConfig}
         */
        this.config = options.config;

        /**
         * The bot's permission levels
         * @type {IPerm}
         */
        this.perms = options.perms ? require(`../../${options.perms}`) : {};

        Logger.log(`Client initialized. You are using node version ${process.version}`);
    }

    /**
     * Authenticates the bot with the discord api
     * @param {string} token The token used for authentication
     */
    public async authenticate(token: string): Promise<this> {
        // Logs in with extended client
        await super.login(token);

        // Returns this class for chaining calls
        return this;
    }

    /**
     * Loads all commands in the specified directory as listeners
     * @param {String} path The path where the commands are contained
     * @returns Promise<void>
     */
    public async loadCommands(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            readdir(Path.join(__dirname, '../', path), async (error, files) => {
                // Check for errors
                if (error) return reject(error);

                // Loop through files
                for (let file of files) {
                    // Check if file isn't js (eg .js.map, etc)
                    if (!file.endsWith(".js") && !file.endsWith('.ts')) continue;
                    // Import the file
                    const imported = await import(`../${path}/${file}`)
                    // Initialize the command
                    const command:Command = new imported.default(this);

                    // Add to collection
                    this.commands.set(command.name, command);
                    command.aliases.forEach(alias => this.aliases.set(alias, command.name));

                    Logger.cmd(`Command '${command.name}' is now loaded!`);
                }

                Logger.log('All commands have been initalized')
                // Resolve the promise
                return resolve();
            })
        })
    }

    /**
     * Loads all events in specified directory
     * @param {string} path The path where the events are located
     */
    public async loadEvents(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // Read directory from dist
            readdir(Path.join(__dirname, '../', path), async (error, files) => {
                // Checks for errors
                if (error) return reject(error);

                // Loop through all files
                for (let file of files) {
                    // Check if file isn't js
                    if (!file.endsWith('.js') && !file.endsWith('.ts')) continue;
                    // Import the file
                    const imported = await import(`../${path}/${file}`);
                    // Initalize the event
                    const event: Event = new imported.default(this);

                    // Add the listener
                    this.on(event.name, (...args: any) => event._run(...args));
                    Logger.cmd(`Event '${event.name}' has been initalized!`);
                };

                Logger.log('All events have been initalized!');
                resolve();
            });
        })
    }

    /**
     * This removes tokens, @everyone pings, and escapes code blocks,
     * as well as resolving promises, and stringifying objects,
     * courtesy of Guidebot
     * @param {string} text The text to clean
     */
    public async clean(text: string) {
        if (text && text.constructor.name == "Promise")
            text = await text;
        if (typeof text !== "string")
            text = require("util").inspect(text, { depth: 1 });
    
        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(this.config!.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
    
        return text;
    }
}