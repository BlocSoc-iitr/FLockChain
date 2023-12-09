"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEventIndexingHandlers = exports.generateEventFieldAssignments = exports.renameInput = exports.INPUT_NAMES_BLACKLIST = exports.generateFieldAssignments = exports.generateFieldAssignment = void 0;
const util = __importStar(require("../codegen/util"));
const generateFieldAssignment = (key, value) => `entity.${key.join('_')} = event.params.${value.join('.')}`;
exports.generateFieldAssignment = generateFieldAssignment;
const generateFieldAssignments = ({ index, input }) => input.type === 'tuple'
    ? util
        .unrollTuple({ value: input, index, path: [input.name || `param${index}`] })
        .map(({ path }) => (0, exports.generateFieldAssignment)(path, path))
    : (0, exports.generateFieldAssignment)([(input.mappedName ?? input.name) || `param${index}`], [input.name || `param${index}`]);
exports.generateFieldAssignments = generateFieldAssignments;
/**
 * Map of input names that are reserved so we do not use them as field names to avoid conflicts
 */
exports.INPUT_NAMES_BLACKLIST = {
    /** Related to https://github.com/graphprotocol/graph-tooling/issues/710 */
    id: 'id',
};
const renameInput = (name, subgraphName) => {
    const inputMap = {
        [exports.INPUT_NAMES_BLACKLIST.id]: `${subgraphName}_id`,
    };
    return inputMap?.[name] ?? name;
};
exports.renameInput = renameInput;
const generateEventFieldAssignments = (event, contractName) => event.inputs.reduce((acc, input, index) => {
    if (Object.values(exports.INPUT_NAMES_BLACKLIST).includes(input.name)) {
        input.mappedName = (0, exports.renameInput)(input.name, contractName ?? 'contract');
    }
    return acc.concat((0, exports.generateFieldAssignments)({ input, index }));
}, []);
exports.generateEventFieldAssignments = generateEventFieldAssignments;
const generateEventIndexingHandlers = (events, contractName) => `
  import { ${events.map(event => `${event._alias} as ${event._alias}Event`)}} from '../generated/${contractName}/${contractName}'
  import { ${events.map(event => event._alias)} } from '../generated/schema'

  ${events
    .map(event => `
  export function handle${event._alias}(event: ${event._alias}Event): void {
    let entity = new ${event._alias}(event.transaction.hash.concatI32(event.logIndex.toI32()))
    ${(0, exports.generateEventFieldAssignments)(event, contractName).join('\n')}

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
  }
    `)
    .join('\n')}
`;
exports.generateEventIndexingHandlers = generateEventIndexingHandlers;
