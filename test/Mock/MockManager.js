'use strict';

let cxManager = require('../../').Manager;

module.exports = class MockManager extends cxManager {
    constructor() {
        super();
        this.tag = 'mock.manager';
    }
};
