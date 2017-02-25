'use strict';

let cxVoidSystem = require('../../bin/Complex').cxVoidSystem;

module.exports = class VoidSystem extends cxVoidSystem{
    constructor(){
        super();
        this.tag = 'mock.system.void';
    }
}
