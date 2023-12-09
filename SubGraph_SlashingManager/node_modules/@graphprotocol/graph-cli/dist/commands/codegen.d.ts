import { Command } from '@oclif/core';
export default class CodegenCommand extends Command {
    static description: string;
    static args: {
        'subgraph-manifest': import("@oclif/core/lib/interfaces/parser").Arg<string, Record<string, unknown>>;
    };
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        'output-dir': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'skip-migrations': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        watch: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        uncrashable: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'uncrashable-config': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    run(): Promise<void>;
}
