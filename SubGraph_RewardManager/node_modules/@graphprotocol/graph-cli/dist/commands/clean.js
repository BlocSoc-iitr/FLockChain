"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gluegun_1 = require("gluegun");
const core_1 = require("@oclif/core");
class CleanCommand extends core_1.Command {
    async run() {
        const { flags: { 'codegen-dir': codegenDir, 'build-dir': buildDir }, } = await this.parse(CleanCommand);
        const spinner = gluegun_1.print.spin(`Cleaning cache and generated files`);
        spinner.start();
        try {
            await gluegun_1.filesystem.removeAsync(codegenDir);
            await gluegun_1.filesystem.removeAsync(buildDir);
            spinner.succeed();
            gluegun_1.print.success('Cache and generated files cleaned');
        }
        catch (e) {
            spinner.fail('Failed to clean cache and generated files');
        }
        finally {
            spinner.stop();
        }
    }
}
CleanCommand.description = 'Clean the cache and generated files.';
CleanCommand.flags = {
    help: core_1.Flags.help({
        char: 'h',
    }),
    'codegen-dir': core_1.Flags.directory({
        summary: 'Directory where the "graph codegen" code is stored.',
        default: 'generated/',
    }),
    'build-dir': core_1.Flags.directory({
        summary: 'Directory where the "graph build" code is stored.',
        default: 'build/',
    }),
};
exports.default = CleanCommand;
