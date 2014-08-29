/**
 * [System description]
 * @param {[type]} arrayOfComponents [description]
 */
(function(){

    /**
     * @constructor
     */
    var System = function()
    {
        cx.GameObject.call(this);
        this.world = null;
        this.tag = null;
    }

    System.TYPE_VOID = "void";
    System.TYPE_PROCESS = "process";

    System.prototype = Object.create(cx.GameObject);
    System.prototype.constructor = System;


    /**
    * called as soon the system has been added to the world object
    */
    System.prototype.addedToWorld = function()
    {

    }

    /**
     * Called when an entity has been added to the world
     * @param  {cx.Entity} entity [description]
     */
    System.prototype.added = function( entity )
    {

    }

    /**
     * Called when an entity has been removed from world
     * @param  {cx.Entity} entity [description]
     */
    System.prototype.removed = function( entity )
    {

    }

    /**
     * [setWorld description]
     * @param {cx.World} world [description]
     */
    System.prototype.setWorld = function ( world )
    {
        this.world = world;
    }

    /**
     * [getWorld description]
     * @return {cx.World} world
     */
    System.prototype.getWorld = function ( )
    {
        return this.world;
    }

    cx.System = System;
})();
