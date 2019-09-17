export default interface IConfig {
    prefix: string;
    token: string;
    paths: IPaths;
    ownerID: string;
}

export interface IPaths {
    commands: string;
    events: string;
}