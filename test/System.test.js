'use strict';

const unit = require('unit.js');
const sinon = require('sinon');

const { EntitySystem, World, VoidSystem, Component, Entity, } = require('../');


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

class MyNotSystem {
    constructor() {
	}
	
	setWorld(){}
}

describe('System', function () {
	it('add invalid system', function () {
		let world = new World();
		let system = new MyNotSystem();

		world.addSystem(system);
		unit.array(world.entitySystems).hasLength(0);
		unit.array(world.voidSystems).hasLength(0);
	});

	it('add valid voidsystem', function () {
		let world = new World();
		let system = new MyVoidSystem();

		world.addSystem(system);
		unit.array(world.entitySystems).hasLength(0);
		unit.array(world.voidSystems).hasLength(1);
	});

	it('add valid entitysystem', function () {
		let world = new World();
		let system = new MyEntitySystem();

		world.addSystem(system);
		unit.array(world.entitySystems).hasLength(1);
		unit.array(world.voidSystems).hasLength(0);
	});

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
