import type { DocumentNode } from 'graphql/language';
import SchemaCodeGenerator from './codegen/schema';
export default class Schema {
    filename: string;
    document: string;
    ast: DocumentNode;
    constructor(filename: string, document: string, ast: DocumentNode);
    codeGenerator(): SchemaCodeGenerator;
    static load(filename: string): Promise<Schema>;
}
