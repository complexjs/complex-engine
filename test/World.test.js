'use strict';

let test = require('unit.js');
import { Entity, World } from '../src/Complex';

let MockEntitySystem = require('./Mock/EntitySystem.js');
let MockVoidSystem = require('./Mock/VoidSystem.js');
let MockManager = require('./Mock/MockManager.js');


describe('World', function () {
    describe('entities', function () {
        it('add', function () {
            let world = new World();
            let entity = new Entity();

            world.addEntity(entity);

            test.array(world.getEntities()).hasLength(1);
        });

        it('add invalid', function () {
            let world = new World();
            test.exception(function () {
                world.addEntity({ 'foo': 'bar' });
            });

            test.array(world.getEntities()).hasLength(0);
        });

        it('remove', function () {
            let world = new World();
            let entity = new Entity();

            world.addEntity(entity);
            world.removeEntity(entity);

            test.array(world.getEntities()).hasLength(0);
        });

        it('get', function () {
            let world = new World();
            let entity = new Entity();

            world.addEntity(entity);
            let e = world.getEntity(entity.getIndex());

            test.object(e);
        });

        it('get all', function () {
            let world = new World();
            let entity = new Entity();

            world.addEntity(entity);
            let e = world.getEntities();

            test.array(e).hasLength(1);
        });
    });

    describe('system', function () {
        it('add', function () {
            let world = new World();
            let eSys = new MockEntitySystem();
            let vSys = new MockVoidSystem();

            world.addSystem(eSys);
            world.addSystem(vSys);

            test.array(world.getEntitySystems()).hasLength(1);
            test.array(world.getVoidSystems()).hasLength(1);
        });

        it('add invalid', function () {
            let world = new World();

            test.exception(function () {
                world.addSystem({ 'foo': 'bar' });
            });

            test.array(world.getEntitySystems()).hasLength(0);
            test.array(world.getVoidSystems()).hasLength(0);
        });

        it('get', function () {
            let world = new World();
            let eSys = new MockEntitySystem();
            let vSys = new MockVoidSystem();

            world.addSystem(eSys);
            world.addSystem(vSys);

            test.object(world.getSystem(MockEntitySystem));
            test.object(world.getSystem(MockVoidSystem));
        });

        it('remove', function () {
            let world = new World();
            let eSys = new MockEntitySystem();
            let vSys = new MockVoidSystem();

            world.addSystem(eSys);
            world.addSystem(vSys);

            world.removeSystem(MockEntitySystem);

            test.array(world.getEntitySystems()).hasLength(0);
            test.array(world.getVoidSystems()).hasLength(1);

            world.removeSystem(MockVoidSystem);
            test.array(world.getEntitySystems()).hasLength(0);
            test.array(world.getVoidSystems()).hasLength(0);
        });
    });

    describe('manager', function () {
        it('add', function () {
            let world = new World();
            let mngr = new MockManager();

            world.addManager(mngr);
            test.array(world.getManagers()).hasLength(1);
        });

        it('add invalid', function () {
            let world = new World();
            test.exception(function () {
                world.addManager({ 'foo': 'bar' });
            });
            test.array(world.getManagers()).hasLength(0);
        });

        it('get', function () {
            let world = new World();
            let mngr = new MockManager();

            world.addManager(mngr);
            let m = world.getManager(MockManager);
            test.object(m);
        });
    });


    it('update', function () {
        let world = new World();
        let eSys = new MockEntitySystem();
        let vSys = new MockVoidSystem();

        world.addSystem(eSys);
        world.addSystem(vSys);
        world.init();

        test.exception(function () {
            world.step();
        })
    });

    it('update invalid', function () {
        let world = new World();
        let eSys = new MockEntitySystem();
        let vSys = new MockVoidSystem();

        world.addSystem(eSys);
        world.addSystem(vSys);

        test.exception(function () {
            world.step();
        })
    });

});
