import ABI from '../protocols/ethereum/abi';
export declare const loadAbiFromEtherscan: (ABICtor: typeof ABI, network: string, address: string) => Promise<ABI>;
export declare const loadStartBlockForContract: (network: string, address: string) => Promise<string>;
export declare const fetchDeployContractTransactionFromEtherscan: (network: string, address: string) => Promise<string>;
export declare const fetchContractCreationHashWithRetry: (url: string, retryCount: number) => Promise<any>;
export declare const fetchTransactionByHashFromRPC: (network: string, transactionHash: string) => Promise<any>;
export declare const getStartBlockForContract: (network: string, address: string) => Promise<number>;
export declare const loadAbiFromBlockScout: (ABICtor: typeof ABI, network: string, address: string) => Promise<any>;
