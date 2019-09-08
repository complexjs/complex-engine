import { expect } from 'chai';
import cxEntity from '../src/Entity';
import MockComponent from './Mock/MockComponent';
import sinon from 'sinon';
import SecondMockComponent from './Mock/SecondMockComponent';

describe('Entity', function() {

    it('getComponent', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new SecondMockComponent());
        const component = entity.getComponent(SecondMockComponent);
        expect(component).to.be.not.null;
        expect(component.foo).to.be.equal('bar');
    });

    it('hasComponent', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new SecondMockComponent());
        const hasComp = entity.hasComponent(SecondMockComponent);
        expect(hasComp).to.be.true;
    });

    it('getAllComponents', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        expect(entity.getAllComponents()).to.have.lengthOf(1);
    });

    it('add multiple components', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        expect(entity.getAllComponents()).to.have.lengthOf(3);
    });

    it('getComponents single', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        let comp = entity.getComponents(MockComponent);
        expect(comp).to.have.lengthOf(1);
    });

    it('getComponents multiple', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        entity.addComponent(new SecondMockComponent());
        let comp = entity.getComponents(MockComponent);
        expect(comp).to.have.lengthOf(3);
    });

    it('get non existent Component', function() {
        let entity = new cxEntity();
        let comp = entity.getComponents(MockComponent);
        expect(comp).to.have.lengthOf(0);
    });

    it('has component', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        let comp = entity.hasComponent(MockComponent);
        expect(comp).to.be.true;
    });

    it('check has non existent component ', function() {
        let entity = new cxEntity();
        let comp = entity.hasComponent(MockComponent);
        expect(comp).to.be.false;
    });

    it('remove component', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.removeComponent(MockComponent);
        expect(entity.getAllComponents()).to.have.lengthOf(0);
    });

    it('remove non existent component', function() {
        let entity = new cxEntity();
        //entity.addComponent(new MockComponent());
        entity.removeComponent(MockComponent);
        expect(entity.getAllComponents()).to.have.lengthOf(0);
    });

    it('get all components', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        expect(entity.getAllComponents()).to.have.lengthOf(2);

    });

    it('destroy entity', function() {
        let entity = new cxEntity();
        entity.destroy();
        expect(entity.isAlive()).to.be.false;
        expect(entity.isRemove()).to.be.true;
    });

    it('add listener', function() {
        const entity = new cxEntity();
        const callback = sinon.spy();
        entity.addListener('foo', function() {
            callback();
        });

        entity.emit('foo');
        expect(callback.called).to.be.true;
    });

    it('add multiple listener', function() {
        const entity = new cxEntity();
        const callback = sinon.spy();
        const callback2 = sinon.spy();
        entity.addListener('foo', function() {
            callback();
        });

        entity.addListener('foo', function() {
            callback2();
        });

        entity.emit('foo');
        expect(callback.called).to.be.true;
        expect(callback2.called).to.be.true;
    });

    it('remove listener', function() {
        const entity = new cxEntity();
        const callback = sinon.spy();
        entity.addListener('foo', function() {
            callback();
        });

        entity.removeListener('foo');

        expect(entity.listeners).to.be.empty
    });

    it('emit event', function() {
        const entity = new cxEntity();
        const callback = sinon.spy();
        const callback2 = sinon.spy();
        entity.addListener('foo', function() {
            callback();
        });

        entity.addListener('bar', function() {
            callback2();
        });

        entity.emit('foo');
        expect(callback.called).to.be.true;
        expect(callback2.called).to.be.false;
    });

});
