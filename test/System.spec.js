import sinon from 'sinon';
import {expect} from 'chai';

import { Component, Entity, EntitySystem, VoidSystem, World, } from '../src';


class MyComponent extends Component {
    constructor() {
        super();
    }
}

class MyEntitySystem extends EntitySystem {
    constructor() {
        super();
        this.components = [MyComponent];
    }
}

class MyVoidSystem extends VoidSystem {
    constructor() {
        super();
    }

}

describe('System', function() {
    describe('VoidSystem', function() {
        it('update', function() {
            let world = new World();
            let system = new MyVoidSystem();
            let update = sinon.spy();
            system.update = update;

            world.addSystem(system);
            world.init();
            world.update();
            expect(update.called).to.be.true;
        });
    });


    describe('EntitySystem', function() {
        it('update', function() {
            let world = new World();
            let system = new MyEntitySystem();
            let entity = new Entity();

            let update = sinon.spy();
            system.update = update;

            entity.addComponent(new MyComponent());
            world.addEntity(entity);
            world.addSystem(system);
            world.init();
            world.update();

            expect(update.called).to.be.true;
        });
    });

});
