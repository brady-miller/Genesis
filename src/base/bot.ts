import { Client, Collection, ClientOptions, DiscordAPIError } from 'discord.js';
import { readdir } from 'fs';
import IOptions from '../types/IOptions';
import IConfig from '../types/IConfig';
import IPerms from '../types/IPerms';

export default class Genesis extends Client {
    public commands: Collection<any, any>;
    public aliases: Collection<any, any>;
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

        console.log(`Client initialized. You are using node version ${process.version}`);
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
     * Loads all commands in the specified directory
     * @param {string} path The path where the commands are contained
     */
    public async loadCommands(path: string) {
        // Reads all files in specified path
        await readdir(path, (err, files) => {
            // Breaks callback and logs error if error occurs
            if (err) return console.log(err);

            files.forEach(cmd => {
                // Imports command into 'command' variable
                const command = new (require(`../${path}/${cmd}`))(this);

                // Enters the command into the commands collection
                this.commands.set(command.help.name, command);

                // Sets command aliases in aliases collection
                command.conf.aliases.forEach((alias: string[]) => this.aliases.set(alias, command.help.name))
            });
        });

        return this;
    }

    /**
     * Loads all events in specified directory
     * @param {string} path The path where the events are located
     */
    public async loadEvents(path: string) {
        await readdir(path, (err, files) => {
            if (err) return console.log(err);

            files.forEach(evt => {
                const event = new (require(`../${path}/${evt}`))(this);

                super.on(evt.split(".")[0], (...args: any[]) => event.run(...args));
            })
        });

        return this;
    }
}