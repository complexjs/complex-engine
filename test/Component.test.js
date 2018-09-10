'use strict';

const unit = require('unit.js');
const { Component, } = require('../');

class MyComponent extends Component {
    constructor() {
        super();
    }

    static get tag() {
        return 'my.component'
    }
}

describe('Component', function () {

});
