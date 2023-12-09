import { Command } from '@oclif/core';
export default class LocalCommand extends Command {
    static description: string;
    static args: {
        'local-command': import("@oclif/core/lib/interfaces/parser").Arg<string, Record<string, unknown>>;
    };
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        'node-logs': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'ethereum-logs': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'compose-file': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'node-image': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'standalone-node': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'standalone-node-args': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        'skip-wait-for-ipfs': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'skip-wait-for-ethereum': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'skip-wait-for-etherium': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'skip-wait-for-postgres': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        timeout: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
    };
    run(): Promise<void>;
}
