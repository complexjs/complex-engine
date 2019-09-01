'use strict';

import cxVoidSystem from '../../src/System/VoidSystem';

module.exports = class VoidSystem extends cxVoidSystem {
    constructor() {
        super();
        this.tag = 'mock.system.void';
    }
};
