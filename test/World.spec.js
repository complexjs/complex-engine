'use strict';
import { expect } from 'chai';
import { Entity, World } from '../src';

import MockEntitySystem from './Mock/EntitySystem.js';
import MockVoidSystem from './Mock/VoidSystem.js';
import MockManager from './Mock/MockManager.js';


describe('World', function() {
    describe('entities', function() {
        it('add', function() {
            let world = new World();
            let entity = new Entity();

            world.addEntity(entity);

            expect(world.getEntities()).to.have.lengthOf(1);
        });

        it('add invalid', function() {
            let world = new World();
            expect(function() {
                world.addEntity({ 'foo': 'bar' });
            }).to.throw();

            expect(world.getEntities()).to.have.lengthOf(0);
        });

        it('remove', function() {
            let world = new World();
            let entity = new Entity();

            world.addEntity(entity);
            world.removeEntity(entity);

            expect(world.getEntities()).to.have.lengthOf(0);
        });

        it('get', function() {
            let world = new World();
            let entity = new Entity();

            world.addEntity(entity);
            let e = world.getEntity(entity.getIndex());

            expect(3).to.be.not.null;
        });

        it('get all', function() {
            let world = new World();
            let entity = new Entity();

            world.addEntity(entity);
            let e = world.getEntities();

            expect(e).to.have.lengthOf(1);
        });
    });

    describe('system', function() {
        it('add', function() {
            let world = new World();
            let eSys = new MockEntitySystem();
            let vSys = new MockVoidSystem();

            world.addSystem(eSys);
            world.addSystem(vSys);

            expect(world.getEntitySystems()).to.have.lengthOf(1);
            expect(world.getVoidSystems()).to.have.lengthOf(1);
        });

        it('add invalid', function() {
            let world = new World();

            expect(function() {
                world.addSystem({ 'foo': 'bar' });
            }).to.throw();

            expect(world.getEntitySystems()).to.have.lengthOf(0);
            expect(world.getVoidSystems()).to.have.lengthOf(0);
        });

        it('get', function() {
            let world = new World();
            let eSys = new MockEntitySystem();
            let vSys = new MockVoidSystem();

            world.addSystem(eSys);
            world.addSystem(vSys);

            expect(world.getSystem(MockEntitySystem)).to.be.not.null;
            expect(world.getSystem(MockVoidSystem)).to.be.not.null;
        });

        it('remove', function() {
            let world = new World();
            let eSys = new MockEntitySystem();
            let vSys = new MockVoidSystem();

            world.addSystem(eSys);
            world.addSystem(vSys);

            world.removeSystem(MockEntitySystem);
            world.removeSystem(MockVoidSystem);

            expect(world.getEntitySystems()).to.have.lengthOf(0);
            expect(world.getVoidSystems()).to.have.lengthOf(0);
        });
    });

    describe('manager', function() {
        it('add', function() {
            let world = new World();
            let mngr = new MockManager();

            world.addManager(mngr);
            expect(world.getManagers()).to.have.lengthOf(1);
        });

        it('add invalid', function() {
            let world = new World();
            expect(function() {
                world.addManager({ 'foo': 'bar' });
            }).to.throw();

            expect(world.getManagers()).to.have.lengthOf(0);
        });

        it('get', function() {
            let world = new World();
            let mngr = new MockManager();

            world.addManager(mngr);
            let m = world.getManager(MockManager);
            expect(m).to.be.not.null
        });
    });


    it('update', function() {
        let world = new World();
        let eSys = new MockEntitySystem();
        let vSys = new MockVoidSystem();

        world.addSystem(eSys);
        world.addSystem(vSys);
        world.init();

        expect(function() {
            world.step();
        }).to.throw();
    });

    it('update invalid', function() {
        let world = new World();
        let eSys = new MockEntitySystem();
        let vSys = new MockVoidSystem();

        world.addSystem(eSys);
        world.addSystem(vSys);

        expect(function() {
            world.step();
        }).to.throw();
    });

});
