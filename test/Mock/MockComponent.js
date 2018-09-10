'use strict';

let cxComponent = require('../../').Component;

module.exports = class MockComponent extends cxComponent {
    constructor() {
        super();
        this.tag = 'mock.component';
    }
};
