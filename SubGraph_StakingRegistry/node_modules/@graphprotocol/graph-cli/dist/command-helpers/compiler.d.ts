/// <reference types="node" />
import { URL } from 'url';
import Compiler from '../compiler';
import Protocol from '../protocols';
interface CreateCompilerOptions {
    ipfs: string | URL | undefined;
    headers?: Headers | Record<string, string>;
    outputDir: string;
    outputFormat: string;
    skipMigrations: boolean;
    blockIpfsMethods?: RegExpMatchArray;
    protocol: Protocol;
}
/**
 * Appends /api/v0 to the end of a The Graph IPFS URL
 */
export declare function appendApiVersionForGraph(inputString: string): string;
export declare function createCompiler(manifest: string, { ipfs, headers, outputDir, outputFormat, skipMigrations, blockIpfsMethods, protocol, }: CreateCompilerOptions): Compiler | null;
export {};
