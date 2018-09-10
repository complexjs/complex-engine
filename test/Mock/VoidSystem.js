'use strict';

let cxVoidSystem = require('../../').VoidSystem;

module.exports = class VoidSystem extends cxVoidSystem {
    constructor() {
        super();
        this.tag = 'mock.system.void';
    }
};
