import { Contract } from '../contract';
export default class EthereumContract implements Contract {
    private address;
    static identifierName(): string;
    constructor(address: string);
    validate(): {
        valid: boolean;
        error: string | null;
    };
}
