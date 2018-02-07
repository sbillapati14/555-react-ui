import { assert } from 'chai';
import * as IrisReactUI from './index';

describe('Iris React UI', () => {
    it('should have exports', () => assert.ok(IrisReactUI));

    it('should not do undefined exports', () => {
        Object.keys(IrisReactUI).forEach(exportKey => assert.ok(IrisReactUI[exportKey]));
    });
});