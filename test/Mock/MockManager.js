'use strict';

import cxManager from '../../src/Manager';

module.exports = class MockManager extends cxManager {
    constructor() {
        super();
        this.tag = 'mock.manager';
    }
};
