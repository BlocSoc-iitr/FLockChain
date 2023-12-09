import { Config } from '@oclif/core';
export default class ZshCompWithSpaces {
    protected config: Config;
    private topics;
    private commands;
    private _coTopics?;
    constructor(config: Config);
    private sanitizeSummary;
    generate(): string;
    private genZshFlagArgumentsBlock;
    private genZshValuesBlock;
    private genZshTopicCompFun;
    private get coTopics();
    private getTopics;
    private getCommands;
}
