import { expect } from 'chai';
import GroupManager from '../src/Manager/GroupManager';
import Entity from '../src/Entity';

describe('GroupManager', function() {
    it('addToGroup', function() {
        const manager = new GroupManager();
        const entity = new Entity();
        manager.addToGroup(entity, 'foo');
        expect(manager.groups.foo).to.be.not.null;
    });

    it('removeFromGroup', function() {
        const manager = new GroupManager();
        const entity = new Entity();
        manager.addToGroup(entity, 'foo');
        manager.removeFromGroup(entity, 'foo');
        expect(manager.groups.foo).to.be.lengthOf(0);
    });

    it('getGroup', function() {
        const manager = new GroupManager();
        const entity = new Entity();
        manager.addToGroup(entity, 'foo');
        const list = manager.getGroup('foo');
        expect(list).to.be.lengthOf(1);
    });
});
