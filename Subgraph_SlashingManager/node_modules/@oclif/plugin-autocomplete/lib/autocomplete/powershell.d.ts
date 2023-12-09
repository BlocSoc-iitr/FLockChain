import { Config } from '@oclif/core';
export default class PowerShellComp {
    protected config: Config;
    private topics;
    private _coTopics?;
    private commands;
    constructor(config: Config);
    private get coTopics();
    private genCmdHashtable;
    private genHashtable;
    private sanitizeSummary;
    generate(): string;
    private getTopics;
    private getCommands;
}
