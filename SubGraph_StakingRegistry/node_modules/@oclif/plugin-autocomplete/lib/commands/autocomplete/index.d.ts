import { AutocompleteBase } from '../../base';
export default class Index extends AutocompleteBase {
    static description: string;
    static args: {
        shell: import("@oclif/core/lib/interfaces/parser").Arg<string | undefined, Record<string, unknown>>;
    };
    static flags: {
        'refresh-cache': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static examples: string[];
    run(): Promise<void>;
}
