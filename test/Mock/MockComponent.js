'use strict';

let cxComponent = require('../../').cxComponent;

module.exports = class MockComponent extends cxComponent {
    constructor() {
        super();
        this.tag = 'mock.component';
    }
};
