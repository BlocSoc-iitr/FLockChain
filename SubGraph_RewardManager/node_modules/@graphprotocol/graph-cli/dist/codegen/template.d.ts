import immutable from 'immutable';
import Protocol from '../protocols';
import * as tsCodegen from './typescript';
export default class DataSourceTemplateCodeGenerator {
    template: immutable.Map<any, any>;
    protocolTemplateCodeGen: any;
    constructor(template: immutable.Map<any, any>, protocol: Protocol);
    generateModuleImports(): tsCodegen.ModuleImports[];
    generateTypes(): immutable.List<tsCodegen.Class>;
    _generateTemplateType(): tsCodegen.Class;
}
