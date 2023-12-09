"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = require("./compiler");
describe('appendApiVersionForGraph', () => {
    it('append /api/v0 to Prod URL with trailing slash', () => {
        expect((0, compiler_1.appendApiVersionForGraph)('https://api.thegraph.com/ipfs/')).toBe('https://api.thegraph.com/ipfs/api/v0');
    });
    it('append /api/v0 to Prod URL without trailing slash', () => {
        expect((0, compiler_1.appendApiVersionForGraph)('https://api.thegraph.com/ipfs')).toBe('https://api.thegraph.com/ipfs/api/v0');
    });
    it('append /api/v0 to Staging URL without trailing slash', () => {
        expect((0, compiler_1.appendApiVersionForGraph)('https://staging.api.thegraph.com/ipfs')).toBe('https://staging.api.thegraph.com/ipfs/api/v0');
    });
    it('do nothing if Prod URL has /api/v0', () => {
        expect((0, compiler_1.appendApiVersionForGraph)('https://api.thegraph.com/ipfs/api/v0')).toBe('https://api.thegraph.com/ipfs/api/v0');
    });
    it('do nothing if Prod URL has no /ipfs', () => {
        expect((0, compiler_1.appendApiVersionForGraph)('https://api.thegraph.com')).toBe('https://api.thegraph.com');
    });
    it('do nothing for non-graph endpoint', () => {
        expect((0, compiler_1.appendApiVersionForGraph)('https://ipfs.saihaj.dev/')).toBe('https://ipfs.saihaj.dev/');
    });
    it('do nothing for non-graph endpoint ending with /ipfs', () => {
        expect((0, compiler_1.appendApiVersionForGraph)('https://ipfs.saihaj.dev/ipfs/')).toBe('https://ipfs.saihaj.dev/ipfs/');
    });
});
