"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const promises_1 = require("fs/promises");
const bash_1 = tslib_1.__importDefault(require("../../autocomplete/bash"));
const zsh_1 = tslib_1.__importDefault(require("../../autocomplete/zsh"));
const powershell_1 = tslib_1.__importDefault(require("../../autocomplete/powershell"));
const bash_spaces_1 = tslib_1.__importDefault(require("../../autocomplete/bash-spaces"));
const base_1 = require("../../base");
const debug = require('debug')('autocomplete:create');
function sanitizeDescription(description) {
    if (description === undefined) {
        return '';
    }
    return description
        .replace(/([`"])/g, '\\\\\\$1') // backticks and double-quotes require triple-backslashes
        // eslint-disable-next-line no-useless-escape
        .replace(/([\[\]])/g, '\\\\$1') // square brackets require double-backslashes
        .split('\n')[0]; // only use the first line
}
class Create extends base_1.AutocompleteBase {
    async run() {
        // 1. ensure needed dirs
        await this.ensureDirs();
        // 2. save (generated) autocomplete files
        await this.createFiles();
    }
    async ensureDirs() {
        // ensure autocomplete cache dir before doing the children
        await (0, promises_1.mkdir)(this.autocompleteCacheDir, { recursive: true });
        await Promise.all([
            (0, promises_1.mkdir)(this.bashFunctionsDir, { recursive: true }),
            (0, promises_1.mkdir)(this.zshFunctionsDir, { recursive: true }),
            (0, promises_1.mkdir)(this.pwshFunctionsDir, { recursive: true }),
        ]);
    }
    async createFiles() {
        // zsh
        const supportSpaces = this.config.topicSeparator === ' ';
        await Promise.all([
            (0, promises_1.writeFile)(this.bashSetupScriptPath, this.bashSetupScript),
            (0, promises_1.writeFile)(this.bashCompletionFunctionPath, this.bashCompletionFunction),
            (0, promises_1.writeFile)(this.zshSetupScriptPath, this.zshSetupScript),
        ].concat(process.env.OCLIF_AUTOCOMPLETE_TOPIC_SEPARATOR === 'colon' || !supportSpaces ? [
            (0, promises_1.writeFile)(this.zshCompletionFunctionPath, this.zshCompletionFunction),
        ] : [
            (0, promises_1.writeFile)(this.zshCompletionFunctionPath, new zsh_1.default(this.config).generate()),
            (0, promises_1.writeFile)(this.pwshCompletionFunctionPath, new powershell_1.default(this.config).generate()),
        ]));
    }
    get bashSetupScriptPath() {
        // <cachedir>/autocomplete/bash_setup
        return path.join(this.autocompleteCacheDir, 'bash_setup');
    }
    get zshSetupScriptPath() {
        // <cachedir>/autocomplete/zsh_setup
        return path.join(this.autocompleteCacheDir, 'zsh_setup');
    }
    get pwshFunctionsDir() {
        // <cachedir>/autocomplete/functions/powershell
        return path.join(this.autocompleteCacheDir, 'functions', 'powershell');
    }
    get bashFunctionsDir() {
        // <cachedir>/autocomplete/functions/bash
        return path.join(this.autocompleteCacheDir, 'functions', 'bash');
    }
    get zshFunctionsDir() {
        // <cachedir>/autocomplete/functions/zsh
        return path.join(this.autocompleteCacheDir, 'functions', 'zsh');
    }
    get pwshCompletionFunctionPath() {
        // <cachedir>/autocomplete/functions/powershell/<bin>.ps1
        return path.join(this.pwshFunctionsDir, `${this.cliBin}.ps1`);
    }
    get bashCompletionFunctionPath() {
        // <cachedir>/autocomplete/functions/bash/<bin>.bash
        return path.join(this.bashFunctionsDir, `${this.cliBin}.bash`);
    }
    get zshCompletionFunctionPath() {
        // <cachedir>/autocomplete/functions/zsh/_<bin>
        return path.join(this.zshFunctionsDir, `_${this.cliBin}`);
    }
    get bashSetupScript() {
        const setup = path.join(this.bashFunctionsDir, `${this.cliBin}.bash`);
        const bin = this.cliBinEnvVar;
        /* eslint-disable-next-line no-useless-escape */
        return `${bin}_AC_BASH_COMPFUNC_PATH=${setup} && test -f \$${bin}_AC_BASH_COMPFUNC_PATH && source \$${bin}_AC_BASH_COMPFUNC_PATH;
`;
    }
    get zshSetupScript() {
        return `
fpath=(
${this.zshFunctionsDir}
$fpath
);
autoload -Uz compinit;
compinit;\n`;
    }
    get commands() {
        if (this._commands)
            return this._commands;
        const plugins = this.config.plugins;
        const cmds = [];
        plugins.forEach(p => {
            p.commands.forEach(c => {
                try {
                    if (c.hidden)
                        return;
                    const description = sanitizeDescription(c.summary || c.description || '');
                    const flags = c.flags;
                    cmds.push({
                        id: c.id,
                        description,
                        flags,
                    });
                    c.aliases.forEach(a => {
                        cmds.push({
                            id: a,
                            description,
                            flags,
                        });
                    });
                }
                catch (error) {
                    debug(`Error creating zsh flag spec for command ${c.id}`);
                    debug(error.message);
                    this.writeLogFile(error.message);
                }
            });
        });
        this._commands = cmds;
        return this._commands;
    }
    genZshFlagSpecs(Klass) {
        return Object.keys(Klass.flags || {})
            .filter(flag => Klass.flags && !Klass.flags[flag].hidden)
            .map(flag => {
            const f = (Klass.flags && Klass.flags[flag]) || { description: '' };
            const isBoolean = f.type === 'boolean';
            const isOption = f.type === 'option';
            const name = isBoolean ? flag : `${flag}=-`;
            const multiple = isOption && f.multiple ? '*' : '';
            const valueCmpl = isBoolean ? '' : ':';
            const completion = `${multiple}--${name}[${sanitizeDescription(f.summary || f.description)}]${valueCmpl}`;
            return `"${completion}"`;
        })
            .join('\n');
    }
    /* eslint-disable no-useless-escape */
    get genAllCommandsMetaString() {
        return this.commands.map(c => {
            return `\"${c.id.replace(/:/g, '\\:')}:${c.description}\"`;
        }).join('\n');
    }
    /* eslint-enable no-useless-escape */
    get genCaseStatementForFlagsMetaString() {
        // command)
        //   _command_flags=(
        //   "--boolean[bool descr]"
        //   "--value=-[value descr]:"
        //   )
        // ;;
        return this.commands.map(c => {
            return `${c.id})
  _command_flags=(
    ${this.genZshFlagSpecs(c)}
  )
;;\n`;
        }).join('\n');
    }
    genCmdPublicFlags(Command) {
        const Flags = Command.flags || {};
        return Object.keys(Flags)
            .filter(flag => !Flags[flag].hidden)
            .map(flag => `--${flag}`)
            .join(' ');
    }
    get bashCommandsWithFlagsList() {
        return this.commands.map(c => {
            const publicFlags = this.genCmdPublicFlags(c).trim();
            return `${c.id} ${publicFlags}`;
        }).join('\n');
    }
    get bashCompletionFunction() {
        var _a, _b;
        const cliBin = this.cliBin;
        const supportSpaces = this.config.topicSeparator === ' ';
        const bashScript = (process.env.OCLIF_AUTOCOMPLETE_TOPIC_SEPARATOR === 'colon' || !supportSpaces) ? bash_1.default : bash_spaces_1.default;
        return bashScript
            .concat(...((_b = (_a = this.config.binAliases) === null || _a === void 0 ? void 0 : _a.map(alias => `complete -F _<CLI_BIN>_autocomplete ${alias}`).join('\n')) !== null && _b !== void 0 ? _b : []))
            .replace(/<CLI_BIN>/g, cliBin)
            .replace(/<BASH_COMMANDS_WITH_FLAGS_LIST>/g, this.bashCommandsWithFlagsList);
    }
    get zshCompletionFunction() {
        const cliBin = this.cliBin;
        const allCommandsMeta = this.genAllCommandsMetaString;
        const caseStatementForFlagsMeta = this.genCaseStatementForFlagsMetaString;
        return `#compdef ${cliBin}

_${cliBin} () {
  local _command_id=\${words[2]}
  local _cur=\${words[CURRENT]}
  local -a _command_flags=()

  ## public cli commands & flags
  local -a _all_commands=(
${allCommandsMeta}
  )

  _set_flags () {
    case $_command_id in
${caseStatementForFlagsMeta}
    esac
  }
  ## end public cli commands & flags

  _complete_commands () {
    _describe -t all-commands "all commands" _all_commands
  }

  if [ $CURRENT -gt 2 ]; then
    if [[ "$_cur" == -* ]]; then
      _set_flags
    else
      _path_files
    fi
  fi


  _arguments -S '1: :_complete_commands' \\
                $_command_flags
}

_${cliBin}
`;
    }
}
exports.default = Create;
Create.hidden = true;
Create.description = 'create autocomplete setup scripts and completion functions';
