'use strict';

import EntitySystem from '../../src/System/EntitySystem';

module.exports = class EntitySystemA extends EntitySystem {
    constructor() {
        super();
        this.tag = 'mock.system.entity';
    }
};
