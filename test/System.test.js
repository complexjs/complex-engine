const unit = require('unit.js');
const sinon = require('sinon');

import { EntitySystem, World, VoidSystem, Component, Entity, } from 'src';


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

describe('System', function () {
    describe('VoidSystem', function () {
        it('update', function () {
            let world = new World();
            let system = new MyVoidSystem();
            let update = sinon.spy();
            system.update = update;

            world.addSystem(system);
            world.init();
            world.update();
            unit.bool(update.called).isTrue();
        });
    });


    describe('EntitySystem', function () {
        it('update', function () {
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

            unit.bool(update.called).isTrue();
        });
    });

});
