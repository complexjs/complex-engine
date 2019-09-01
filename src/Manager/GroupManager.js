import Manager from '../Manager';

/**
 *
 */
class GroupManager extends Manager {
    constructor() {
        super();
        this.groups = {};
    }

    /**
     * Add entity to group
     * @param {Entity} entity
     * @param {string} groupName
     */
    addToGroup(entity, groupName) {
        if (!this.groups[groupName]) {
            this.groups[groupName] = [];
        }
        this.groups[groupName].push(entity);
    }

    /**
     *
     * @param {Entity} entity
     * @param {string} groupName
     */
    removeFromGroup(entity, groupName) {
        if (!this.groups[groupName]) {
            return;
        }

        this.groups[groupName] = this.groups[groupName].filter((entry) => {
            return entry.index !== entity.index;
        })
    }

    /**
     * Get a group
     * @param {string} name
     * @return {Entity[]}
     */
    getGroup(name) {
        return this.groups[name] || [];
    }

}

export default GroupManager;
