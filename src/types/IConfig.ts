export default interface IConfig {
    token: string;
    paths: IPaths;
}

export interface IPaths {
    commands: string;
    events: string;
}