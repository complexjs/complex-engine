'use strict';

import cxComponent from '../../src/Component'

module.exports = class MockComponent extends cxComponent {
    constructor() {
        super();
        this.tag = 'mock.component';
    }
};
