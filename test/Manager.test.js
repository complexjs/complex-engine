'use strict';

let test = require('unit.js');
const { Manager } = require('../');

class MyManager extends Manager {
    constructor() {
        super();
    }

    static get tag() {
        return 'my.manager';
    }

}

describe('Manager', function () {

});
