import { Command } from '@oclif/core';
export default class AuthCommand extends Command {
    static description: string;
    static args: {
        node: import("@oclif/core/lib/interfaces/parser").Arg<string | undefined, Record<string, unknown>>;
        'deploy-key': import("@oclif/core/lib/interfaces/parser").Arg<string | undefined, Record<string, unknown>>;
    };
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        product: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        studio: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
