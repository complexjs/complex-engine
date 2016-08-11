'use strict';

let cxManager = require('../../Complex').cxManager;

module.exports = class MockManager extends cxManager{
    constructor(){
        super();
        this.tag = 'mock.manager';
    }
}
