'use strict';

let test = require('unit.js');
let cxEntity = require('../').cxEntity;
let cxWorld = require('../').cxWorld;

let MockEntitySystem = require('./Mock/EntitySystem.js');
let MockVoidSystem = require('./Mock/VoidSystem.js');
let MockManager = require('./Mock/MockManager.js');


describe('cxWorld', function () {
    it('addEntity', function () {
        let world = new cxWorld();
        let entity = new cxEntity();

        world.addEntity(entity);

        test.array(world.getEntities()).hasLength(1);
    });

    it('addEntity invalid', function () {
        let world = new cxWorld();
        test.exception(function () {
            world.addEntity({ 'foo': 'bar' });
        });

        test.array(world.getEntities()).hasLength(0);
    });

    it('removeEntity', function () {
        let world = new cxWorld();
        let entity = new cxEntity();

        world.addEntity(entity);
        world.removeEntity(entity);

        test.array(world.getEntities()).hasLength(0);
    });

    it('getEntity', function () {
        let world = new cxWorld();
        let entity = new cxEntity();

        world.addEntity(entity);
        let e = world.getEntity(entity.getIndex());

        test.object(e);
    });

    it('getEntities', function () {
        let world = new cxWorld();
        let entity = new cxEntity();

        world.addEntity(entity);
        let e = world.getEntities();

        test.array(e).hasLength(1);
    });

    it('addSystem', function () {
        let world = new cxWorld();
        let eSys = new MockEntitySystem();
        let vSys = new MockVoidSystem();

        world.addSystem(eSys);
        world.addSystem(vSys);

        test.array(world.getEntitySystems()).hasLength(1);
        test.array(world.getVoidSystems()).hasLength(1);
    });

    it('addSystem invalid', function () {
        let world = new cxWorld();

        test.exception(function () {
            world.addSystem({ 'foo': 'bar' });
        });

        test.array(world.getEntitySystems()).hasLength(0);
        test.array(world.getVoidSystems()).hasLength(0);
    });

    it('getSystem', function () {
        let world = new cxWorld();
        let eSys = new MockEntitySystem();
        let vSys = new MockVoidSystem();

        world.addSystem(eSys);
        world.addSystem(vSys);

        test.object(world.getSystem('mock.system.entity'));
        test.object(world.getSystem('mock.system.void'));
    });

    it('removeSystem', function () {
        let world = new cxWorld();
        let eSys = new MockEntitySystem();
        let vSys = new MockVoidSystem();

        world.addSystem(eSys);
        world.addSystem(vSys);

        world.removeSystem('mock.system.entity');

        test.array(world.getEntitySystems()).hasLength(0);
        test.array(world.getVoidSystems()).hasLength(1);

        world.removeSystem('mock.system.void');
        test.array(world.getEntitySystems()).hasLength(0);
        test.array(world.getVoidSystems()).hasLength(0);
    });


    it('update', function () {
        let world = new cxWorld();
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
        let world = new cxWorld();
        let eSys = new MockEntitySystem();
        let vSys = new MockVoidSystem();

        world.addSystem(eSys);
        world.addSystem(vSys);

        test.exception(function () {
            world.step();
        })
    });

    it('addManager', function () {
        let world = new cxWorld();
        let mngr = new MockManager();

        world.addManager(mngr);
        test.array(world.getManagers()).hasLength(1);
    });

    it('addManager invalid', function () {
        let world = new cxWorld();
        test.exception(function () {
            world.addManager({ 'foo': 'bar' });
        });
        test.array(world.getManagers()).hasLength(0);
    });

    it('getManager', function () {
        let world = new cxWorld();
        let mngr = new MockManager();

        world.addManager(mngr);
        let m = world.getManager('mock.manager');
        test.object(m);
    });
});
