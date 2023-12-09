import immutable from 'immutable';
import Protocol from '../protocols';
import { ContractCtor } from '../protocols/contract';
export declare const validateContract: (value: string, ProtocolContract: ContractCtor) => {
    valid: false;
    error: string;
} | {
    valid: true;
    error: string | null;
};
export declare const validateContractValues: (manifest: immutable.Map<any, any>, protocol: Protocol) => any;
