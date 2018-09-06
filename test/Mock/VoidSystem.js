'use strict';

let cxVoidSystem = require('../../').cxVoidSystem;

module.exports = class VoidSystem extends cxVoidSystem {
    constructor() {
        super();
        this.tag = 'mock.system.void';
    }
};
