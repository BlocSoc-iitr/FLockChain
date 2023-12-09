import immutable from 'immutable';
import * as tsCodegen from '../codegen/typescript';
export default class FileTemplateCodeGen {
    private template;
    constructor(template: immutable.Map<any, any>);
    generateModuleImports(): never[];
    generateCreateMethod(): tsCodegen.StaticMethod;
    generateCreateWithContextMethod(): tsCodegen.StaticMethod;
}
