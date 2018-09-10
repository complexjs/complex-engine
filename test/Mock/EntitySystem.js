'use strict';

let cxEntitySystem = require('../../').EntitySystem;

module.exports = class EntitySystem extends cxEntitySystem {
    constructor() {
        super();
        this.tag = 'mock.system.entity';
    }
};
