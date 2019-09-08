import * as dat from 'dat.gui';
import Manager from '../Manager';

export default class DatGuiManager extends Manager {
    constructor(container) {
        super();
        this.gui = new dat.GUI();
    }

    add(...param) {
        return this.gui.add(...param);
    }

    addFolder(name) {
        return this.gui.addFolder(name);
    }
}
