export default interface IConfig {
    prefix: string;
    token: string;
    paths: IPaths;
}

export interface IPaths {
    commands: string;
    events: string;
}