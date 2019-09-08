'use strict';

import EntitySystem from '../../src/System/EntitySystem';
import MockComponent from './MockComponent';
import SecondMockComponent from './SecondMockComponent';

export default class MultiComponentSystem extends EntitySystem {
    constructor() {
        super([MockComponent, SecondMockComponent]);
    }
};
