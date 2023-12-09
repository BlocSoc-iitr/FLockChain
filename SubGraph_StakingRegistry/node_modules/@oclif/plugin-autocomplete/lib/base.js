"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutocompleteBase = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const fs_1 = require("fs");
const path = tslib_1.__importStar(require("path"));
class AutocompleteBase extends core_1.Command {
    get cliBin() {
        return this.config.bin;
    }
    get cliBinEnvVar() {
        return this.config.bin.toUpperCase().replace(/-/g, '_');
    }
    determineShell(shell) {
        if (!shell) {
            this.error('Missing required argument shell');
        }
        else if (this.isBashOnWindows(shell)) {
            return 'bash';
        }
        else {
            return shell;
        }
    }
    get autocompleteCacheDir() {
        return path.join(this.config.cacheDir, 'autocomplete');
    }
    get acLogfilePath() {
        return path.join(this.config.cacheDir, 'autocomplete.log');
    }
    writeLogFile(msg) {
        (0, fs_1.mkdirSync)(this.config.cacheDir, { recursive: true });
        const entry = `[${(new Date()).toISOString()}] ${msg}\n`;
        const fd = (0, fs_1.openSync)(this.acLogfilePath, 'a');
        (0, fs_1.writeSync)(fd, entry);
    }
    isBashOnWindows(shell) {
        return shell.endsWith('\\bash.exe');
    }
}
exports.AutocompleteBase = AutocompleteBase;
