import ABI from '../abi';
export declare const source: ({ contract, contractName, startBlock, }: {
    contract: string;
    contractName: string;
    startBlock?: string | undefined;
}) => string;
export declare const mapping: ({ abi, contractName }: {
    abi: ABI;
    contractName: string;
}) => string;
