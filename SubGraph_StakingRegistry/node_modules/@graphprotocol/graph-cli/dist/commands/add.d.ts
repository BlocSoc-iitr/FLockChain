import { Command } from '@oclif/core';
export default class AddCommand extends Command {
    static description: string;
    static args: {
        address: import("@oclif/core/lib/interfaces/parser").Arg<string, Record<string, unknown>>;
        'subgraph-manifest': import("@oclif/core/lib/interfaces/parser").Arg<string, Record<string, unknown>>;
    };
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        abi: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'start-block': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'contract-name': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'merge-entities': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'network-file': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    run(): Promise<void>;
}
