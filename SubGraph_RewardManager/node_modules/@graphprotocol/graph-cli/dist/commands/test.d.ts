import { Command } from '@oclif/core';
export default class TestCommand extends Command {
    static description: string;
    static args: {
        datasource: import("@oclif/core/lib/interfaces/parser").Arg<string | undefined, Record<string, unknown>>;
    };
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        coverage: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        docker: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        logs: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        recompile: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        version: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    run(): Promise<void>;
}
