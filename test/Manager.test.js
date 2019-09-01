let test = require('unit.js');
import Manager from '../src/Manager';

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
