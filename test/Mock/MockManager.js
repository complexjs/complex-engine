'use strict';

let cxManager = require('../../').cxManager;

module.exports = class MockManager extends cxManager {
    constructor() {
        super();
        this.tag = 'mock.manager';
    }
};
