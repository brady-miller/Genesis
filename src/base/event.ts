import Bot from './bot';

/**
 * Represents a Discord Socket Event
 */
class Event {
    public bot: Bot;
    public name: string;
    public handlers: Handler[];

    /**
     * Creates a new event
     * @param {Bot} bot The client referenced in the event
     * @param {String} name The name of the event
     */
    constructor(bot: Bot, name: string) {
        this.bot = bot;
        this.name = name;

        this.handlers = [];
    }

    /**
     * Adds a handler to - a file exporting a function that runs if the function returns true
     * @param {String} name The name of the file (no extension)
     * @param {Function} func The condition to check
     */
    async addHandler(name: string, func: Function): Promise<void> {
        this.handlers.push({
            condition: func,
            run: (await import(`../helpers/${name}.js`)).default
        });

        return;
    }

    /**
     * Runs all events and handlers
     * @param {any} args Any value(s) passed by discord.js events
     * @returns void
     */
    _run(...args: any): void {
        for (let handler of this.handlers) {
            if (handler.condition(...args)) handler.run(this.bot, ...args);
        }
        // @ts-ignore
        this.run(...args);

        return;
    }
}

type Handler = { 
    condition: Function;
    run: Function;
};

interface Event {
    bot: Bot;
    name: string;
    handlers: Handler[];
};

export default Event;