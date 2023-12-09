"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const path = tslib_1.__importStar(require("path"));
const base_1 = require("../../base");
class Script extends base_1.AutocompleteBase {
    async run() {
        const { args } = await this.parse(Script);
        const shell = args.shell || this.config.shell;
        const binUpcase = this.cliBinEnvVar;
        const shellUpcase = shell.toUpperCase();
        if (shell === 'powershell') {
            const completionFuncPath = path.join(this.config.cacheDir, 'autocomplete', 'functions', 'powershell', `${this.cliBin}.ps1`);
            this.log(`. ${completionFuncPath}`);
        }
        else {
            this.log(`${this.prefix}${binUpcase}_AC_${shellUpcase}_SETUP_PATH=${path.join(this.autocompleteCacheDir, `${shell}_setup`)} && test -f $${binUpcase}_AC_${shellUpcase}_SETUP_PATH && source $${binUpcase}_AC_${shellUpcase}_SETUP_PATH;${this.suffix}`);
        }
    }
    get prefix() {
        return '\n';
    }
    get suffix() {
        return ` # ${this.cliBin} autocomplete setup\n`;
    }
}
exports.default = Script;
Script.description = 'outputs autocomplete config script for shells';
Script.hidden = true;
Script.args = {
    shell: core_1.Args.string({
        description: 'Shell type',
        options: ['zsh', 'bash', 'powershell'],
        required: false,
    }),
};
