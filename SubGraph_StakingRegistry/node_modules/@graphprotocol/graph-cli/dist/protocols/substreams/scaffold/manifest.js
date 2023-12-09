"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapping = exports.source = void 0;
const source = ({ spkgPath }) => `
      package:
        moduleName: graph_out
        file: ${spkgPath || 'substreams-eth-block-meta-v0.1.0.spkg'}`;
exports.source = source;
const mapping = () => `
      apiVersion: 0.0.5
      kind: substreams/graph-entities`;
exports.mapping = mapping;
