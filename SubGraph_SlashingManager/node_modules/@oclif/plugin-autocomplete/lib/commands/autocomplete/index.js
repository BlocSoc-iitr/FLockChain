"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const os_1 = require("os");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const base_1 = require("../../base");
const create_1 = tslib_1.__importDefault(require("./create"));
const noteFromShell = (shell) => {
    switch (shell) {
        case 'zsh':
            return `After sourcing, you can run \`${chalk_1.default.cyan('$ compaudit -D')}\` to ensure no permissions conflicts are present`;
        case 'bash':
            return 'If your terminal starts as a login shell you may need to print the init script into ~/.bash_profile or ~/.profile.';
        case 'powershell':
            return `Use the \`MenuComplete\` mode to get matching completions printed below the command line:\n${chalk_1.default.cyan('Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete')}`;
        default:
            return '';
    }
};
class Index extends base_1.AutocompleteBase {
    async run() {
        var _a;
        const { args, flags } = await this.parse(Index);
        const shell = args.shell || this.determineShell(this.config.shell);
        if (shell === 'powershell' && ((_a = this.config) === null || _a === void 0 ? void 0 : _a.topicSeparator) === ':') {
            this.error(`PowerShell completion is not supported in CLIs using colon as the topic separator.${os_1.EOL}See: https://oclif.io/docs/topic_separator`);
        }
        core_1.ux.action.start(`${chalk_1.default.bold('Building the autocomplete cache')}`);
        await create_1.default.run([], this.config);
        core_1.ux.action.stop();
        if (!flags['refresh-cache']) {
            const bin = this.config.bin;
            const tabStr = shell === 'bash' ? '<TAB><TAB>' : '<TAB>';
            const instructions = shell === 'powershell' ?
                `New-Item -Type Directory -Path (Split-Path -Parent $PROFILE) -ErrorAction SilentlyContinue
Add-Content -Path $PROFILE -Value (Invoke-Expression -Command "${bin} autocomplete${this.config.topicSeparator}script ${shell}"); .$PROFILE` :
                `$ printf "eval $(${bin} autocomplete${this.config.topicSeparator}script ${shell})" >> ~/.${shell}rc; source ~/.${shell}rc`;
            const note = noteFromShell(shell);
            this.log(`
${chalk_1.default.bold(`Setup Instructions for ${bin.toUpperCase()} CLI Autocomplete ---`)}

1) Add the autocomplete ${shell === 'powershell' ? 'file' : 'env var'} to your ${shell} profile and source it

${chalk_1.default.cyan(instructions)}

${chalk_1.default.bold('NOTE')}: ${note}

2) Test it out, e.g.:
${chalk_1.default.cyan(`$ ${bin} ${tabStr}`)}                 # Command completion
${chalk_1.default.cyan(`$ ${bin} command --${tabStr}`)}       # Flag completion

Enjoy!
`);
        }
    }
}
exports.default = Index;
Index.description = 'display autocomplete installation instructions';
Index.args = {
    shell: core_1.Args.string({
        description: 'Shell type',
        options: ['zsh', 'bash', 'powershell'],
        required: false,
    }),
};
Index.flags = {
    'refresh-cache': core_1.Flags.boolean({ description: 'Refresh cache (ignores displaying instructions)', char: 'r' }),
};
Index.examples = [
    '$ <%= config.bin %> autocomplete',
    '$ <%= config.bin %> autocomplete bash',
    '$ <%= config.bin %> autocomplete zsh',
    '$ <%= config.bin %> autocomplete powershell',
    '$ <%= config.bin %> autocomplete --refresh-cache',
];
