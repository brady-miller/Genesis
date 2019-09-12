import IConfig from './IConfig';
import IPerms from './IPerms';
import { ClientOptions } from 'discord.js';

export default interface IOptions extends ClientOptions {
    clientOptions?: ClientOptions;
    config?: IConfig;
    perms?: IPerms;
}