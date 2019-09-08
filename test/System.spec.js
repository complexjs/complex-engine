import { expect } from 'chai';
import sinon from 'sinon';

import Component from '../src/Component';
import Entity from '../src/Entity';
import EntitySystem from '../src/System/EntitySystem';
import VoidSystem from '../src/System/VoidSystem';
import World from '../src/World';


class MyComponent extends Component {
    constructor() {
        super();
    }
}

class MyEntitySystem extends EntitySystem {
    constructor() {
        super([MyComponent]);
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

            world.addVoidSystem(system)
                .init()
                .update();

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
            world.addEntity(entity)
                .addEntitySystem(system)
                .init()
                .update();

            expect(update.called).to.be.true;
        });
    });
});
