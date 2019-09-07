'use strict';
import { expect } from 'chai';
import Entity from '../src/Entity';
import World from '../src/World';

import MockEntitySystem from './Mock/EntitySystem.js';
import MockManager from './Mock/MockManager.js';
import MockVoidSystem from './Mock/VoidSystem.js';


describe('World', function() {
    it('createEntity', function() {
        let world = new World();
        const entity = world.createEntity([]);

        expect(entity.getIndex()).to.be.equal(0);
    });

    it('addEntity', function() {
        let world = new World();
        let entity = new Entity();

        world.addEntity(entity);

        expect(world.getEntities()).to.have.lengthOf(1);
    });

    it('removeEntity', function() {
        let world = new World();
        let entity = new Entity();

        world.addEntity(entity);
        world.removeEntity(entity);

        expect(world.getEntities()).to.have.lengthOf(0);
    });

    it('getEntity', function() {
        let world = new World();
        let entity = new Entity();

        world.addEntity(entity);
        let e = world.getEntity(entity.getIndex());

        expect(e).to.be.not.null;
    });

    it('getEntity with wrong index', function() {
        let world = new World();
        let entity = new Entity();

        world.addEntity(entity);
        expect(() => {
            world.getEntity(500);
        }).to.throw();
    });

    it('getEntities', function() {
        let world = new World();
        let entity = new Entity();

        world.addEntity(entity);
        let e = world.getEntities();

        expect(e).to.have.lengthOf(1);
    });

    it('addSystem EntitySystem', function() {
        let world = new World();
        let eSys = new MockEntitySystem();

        world.addEntitySystem(eSys);

        expect(world.getEntitySystems()).to.have.lengthOf(1);
    });

    it('addSystem VoidSystem', function() {
        let world = new World();
        let vSys = new MockVoidSystem();

        world.addVoidSystem(vSys);

        expect(world.getVoidSystems()).to.have.lengthOf(1);
    });

    it('addSystem invalid', function() {
        let world = new World();

        expect(function() {
            world.addSystem({ 'foo': 'bar' });
        }).to.throw();

        expect(world.getEntitySystems()).to.have.lengthOf(0);
        expect(world.getVoidSystems()).to.have.lengthOf(0);
    });

    it('getSystem EntitySystem', function() {
        let world = new World();
        let eSys = new MockEntitySystem();

        world.addEntitySystem(eSys);

        expect(world.getSystem(MockEntitySystem)).to.be.not.null;
    });

    it('getSystem VoidSystem', function() {
        let world = new World();
        let vSys = new MockVoidSystem();

        world.addVoidSystem(vSys);

        expect(world.getSystem(MockVoidSystem)).to.be.not.null;
    });

    it('removeSystem EntitySystem', function() {
        let world = new World();
        let eSys = new MockEntitySystem();

        world.addEntitySystem(eSys)
            .removeSystem(MockEntitySystem);

        expect(world.getEntitySystems()).to.have.lengthOf(0);
    });

    it('removeSystem VoidSystem', function() {
        let world = new World();
        let vSys = new MockVoidSystem();

        world.addVoidSystem(vSys)
            .removeSystem(MockVoidSystem);

        expect(world.getVoidSystems()).to.have.lengthOf(0);
    });

    it('addManager', function() {
        let world = new World();
        let mngr = new MockManager();

        world.addManager(mngr);
        expect(world.getManagers()).to.have.lengthOf(1);
    });

    it('addManager invalid', function() {
        let world = new World();

        expect(function() {
            world.addManager({ 'foo': 'bar' });
        }).to.throw();

        expect(world.getManagers()).to.have.lengthOf(0);
    });

    it('getManager', function() {
        let world = new World();
        let mngr = new MockManager();

        world.addManager(mngr);
        let m = world.getManager(MockManager);
        expect(m).to.be.not.null
    });

    it('step', function() {
        let world = new World();
        let eSys = new MockEntitySystem();
        let vSys = new MockVoidSystem();

        world
            //.addEntitySystem(eSys)
            .addVoidSystem(vSys)
            .init();

        expect(function() {
            world.update();
        }).to.not.throw();
    });

    it('step invalid', function() {
        let world = new World();
        let eSys = new MockEntitySystem();
        let vSys = new MockVoidSystem();

        world.addEntitySystem(eSys)
            .addVoidSystem(vSys);

        expect(function() {
            world.update();
        }).to.throw();
    });

});
