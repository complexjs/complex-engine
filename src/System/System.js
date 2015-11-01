class System {

    constructor () {
        this.world = null;
        this.tag = null;
    }

    /**
     * [addedToWorld description]
     * @return {[type]} [description]
     */
    addedToWorld () {

    }

    /**
     * [added description]
     * @param  {cx.Entity} entity [description]
     * @return {[type]}        [description]
     */
    added (entity){

    }

    /**
     * [removed description]
     * @param  {cx.Entity} entity [description]
     * @return {[type]}        [description],
     */
    removed ( entity ) {

    }

    /**
     * [getTypeProcess description]
     * @return {[type]} [description]
     */
    static getTypeProcess () {
        return "type_process";
    }

    /**
     * [getTypeVoid description]
     * @return {[type]} [description]
     */
    static getTypeVoid () {
        return "type_void";
    }
}

cx.System = System;
