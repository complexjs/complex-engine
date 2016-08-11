'use strict';

let cxVoidSystem = require('../../Complex').cxVoidSystem;

module.exports = class VoidSystem extends cxVoidSystem{
    constructor(){
        super();
        this.tag = 'mock.system.void';
    }
}
