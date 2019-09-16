import chalk from 'chalk';
import moment from 'moment';

/**
 * A fancy way of logging timestamped messages to the console
 */
export default class Logger {
    /**
     * Logs a message to the console with appropiate colors and a YYYY-MM-DD format
     * @param {string} content The payload to be displayed to the console
     * @param {string} type Accepts a string with either "log", "warn", "error", "debug", "cmd", or "ready"
     * @throws TypeError
     */
    public static log(content: string, type: string = "log"): void {
        const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`;
        switch (type) {
            case 'log': {
                return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
            }
            case "warn": {
                return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
            }
            case "error": {
                return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
            }
            case "debug": {
                return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
            }
            case "cmd": {
                return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
            }
            case "ready": {
                return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
            } 

            default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
        }
    }

    /**
     * Logs a message to the console in error format
     * @param content Message to be displayed
     */
    static error(content: string): void {
        return this.log(content, "error");
    }
    
    /**
     * Logs a message to the console in warning format
     * @param content Message to be displayed
     */
    static warn(content: string): void {
        return this.log(content, "warn");
    }
      
    /**
     * Logs a message to the console in debug format
     * @param content Message to be displayed
     */
    static debug(content: string): void {
        return this.log(content, "debug");
    } 
      
    /**
     * Logs a message to the console in cmd format
     * @param content Message to be displayed
     */
    static cmd(content: string): void {
        return this.log(content, "cmd");
    } 
}