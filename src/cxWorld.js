"use strict";

import cxSystem from './cxSystem';
import cxEntity from './cxEntity';
import cxManager from './cxManager';
import cxEntitySystem from './System/cxEntitySystem';
import cxVoidSystem from './System/cxVoidSystem';
import InvalidClass from './Exception/InvalidClass';

/**
 * The world contains all entities, systems and managers
 * @class cxWorld
 */
export default class cxWorld {
	constructor () {
		/**
		 * @property entities
		 * @type {Array<cxEntity>}
		 */
		this.entities = [];

		/**
		 * @property voidSystems
		 * @type {Array<cxVoidSystem>}
		 */
		this.voidSystems = [];

		/**
		 * @property entitySystems
		 * @type {Array<cxEntitySystem>}
		 */
		this.entitySystems = [];

		/**
		 * @property managers
		 * @type {Array<cxManager>}
		 */
		this.managers = [];

		/**
		 * @property tag
		 * @type {String}
		 */
		this.tag = 'cx.world';

		/**
		 * @property initialized
		* @type Boolean
		*/
		this.initialized = false;
	}

	/**
	 * Add entity to world
	 * @method addEntity
	 * @param {cxEntity} entity
	 */
	addEntity (entity) {
		if(entity instanceof cxEntity === false){
			throw new InvalidClass('cxEntity');
		}

		let slot = this._getFreeEntitySlot();
		entity.setWorld(this);

		if( slot != null) {
			entity.index = slot;
			this.entities[slot] = entity;
		} else {
			entity.index = this.entities.length;
			this.entities.push(entity);
		}

		this._entityAdded(entity);
	}

	/**
	 * remove entity from world
	 * @method removeEntity
	 * @param  {cxEntity} entity
	 */
	removeEntity ( entity ) {
		this._entityDeleted(entity);
		delete this.entities[entity.index];
	}

	/**
	 * Get entity from world by its id
	 * @method getEntity
	 * @param  {Integer} int
	 * @return {cxEntity}
	 */
	getEntity ( index ) {
		if(this.entities[index] == undefined) {
			throw "Entity "+index+" not found";
		}
		return this.entities[index];
	}

	/**
	 * Get all entities from wold
	 * @method getEntities
	 * @return {Array<cxEntity>}
	 */
	getEntities () {
		let entities = [];
		for(let e = 0, len=this.entities.length; e < len; e++) {
			let entity = this.entities[e];
			if(entity == undefined || entity == null){
				continue;
			}
			entities.push(entity);
		}
		return entities;
	}

	/**
	 * Add a system to world
	 * @method addSystem
	 * @param {cxSystem} system
	 */
	addSystem ( system ) {
		if(system instanceof cxSystem === false){
			throw new InvalidClass('cxSystem')
		}

		system.world = this;

		if(system instanceof cxEntitySystem === true){
			let slot = this._getFreeProcessSystemSlot();
			if(slot != null) {
				this.entitySystems[slot] = system;
			} else {
				this.entitySystems.push(system);
			}
		}else if(system instanceof cxVoidSystem === true){
			let slot = this._getFreeProcessSystemSlot();
			if(slot != null) {
				this.voidSystems[slot] = system;
			} else {
				this.voidSystems.push(system);
			}
		}

	}

	/**
	 * After all systems has been added, this should be called to initiate them
	 * @method init
	 */
	init() {

		for(let i = 0, len = this.entitySystems.length; i < len; i++) {
			let system = this.entitySystems[i];
			system.addedToWorld();
		}

		for(let i = 0, len = this.voidSystems.length; i < len; i++) {
			let system = this.voidSystems[i];
			system.addedToWorld();
		}

		this.initialized = true;
	}

	/**
	 * get a system
	 * @method getSystem
	 * @param  {string|cxSystem} system
	 * @return {cxSystem}
	 */
	getSystem ( system ) {
		let systemName = "";
		if ( typeof system == "string") {
			systemName = system;
		} else {
			systemName = system.tag;
		}

		for(let i = 0, len = this.entitySystems.length; i < len; i++) {
			let system = this.entitySystems[i];
			if ( system.tag == systemName ) {
				return system;
			}
		}

		for(let i = 0, len = this.voidSystems.length; i < len; i++) {
			let system = this.voidSystems[i];
			if ( system.tag == systemName ) {
				return system;
			}
		}

		throw "System "+systemName+" not found";
	}

	/**
	 * Remove system
	 * @method removeSystem
	 * @param  {string|cxSystem} system
	 */
	removeSystem ( system ) {
		let systemName = "";
		if ( typeof system == "string") {
			systemName = system;
		} else {
			systemName = system.tag;
		}

		for(let i = 0, len = this.entitySystems.length; i < len; i++) {
			let system = this.entitySystems[i];
			if(system === undefined){
				continue;
			}
			if ( system.tag == systemName ) {
				delete this.entitySystems[i];
			}
		}

		for(let i = 0, len = this.voidSystems.length; i < len; i++) {
			let system = this.voidSystems[i];
			if(system === undefined){
				continue;
			}
			if ( system.tag == systemName ) {
				delete this.voidSystems[i];
			}
		}
	}

	/**
	 * Add Manager
	 * @method addManager
	 * @param {cxManager} manager
	 */
	addManager ( manager) {
		if(manager instanceof cxManager === false){
			throw new InvalidClass('cxManager');
		}
		manager.world = this;
		this.managers.push(manager);
	}

	/**
	 * Get Manager
	 * @method getManager
	 * @param  {String} name
	 * @return {cxManager}
	 */
	getManager (name) {
		for(let i = 0, len = this.managers.length; i < len; i++) {
			let manager = this.managers[i];
			if(manager.tag == name) {
				return this.managers[i];
			}
		}

		throw "Manager "+name+" not found";
	}

	/**
	 * world loop
	 * @method step
	 */
	step () {
		this.update();
	}

	/**
	 * Update method
	 * @method update
	 */
	update ( ) {
		if(this.initialized === false){
			throw new Error('Not initialized');
		}

		this._updateVoidSystem();
		this._updateEntitySystem();
	}

	/**
	 * update systems
	 * @method _updateVoidSystem
	 */
	_updateVoidSystem () {
		for(let s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
			let system = this.voidSystems[s];
			system.update();
		}
	}

	/**
	 * update systems
	 * @method _updateEntitySystem
	 */
	_updateEntitySystem () {
		for(let s = 0, sLen = this.entitySystems.length; s < sLen; s++) {
			let system = this.entitySystems[s];

			for(let e = 0, eLen = this.entities.length; e < eLen; e++) {
				let entity = this.entities[e];

				if(entity == null) {
					continue;
				}

				if(!entity.alive && entity.remove) {
					this.removeEntity(entity);
					continue;
				}

				if( !entity.alive ) {
					continue;
				}

				let entityComponents = [];
				let updateEntity = true;

				for(let sC = 0, sCLen = system.components.length; sC < sCLen; sC++) {
					let systemComponent = system.components[sC];
					let entityComponent = entity.getComponent(systemComponent);

					if( entityComponent === null ) {
						updateEntity = false;
					}else{
						entityComponents[systemComponent] = entityComponent;
					}
				}

				if(updateEntity) {
					system.update(entity, entityComponents);
				}
			}
		}
	}

	/**
	 * recycle entityslots
	 * @method _getFreeEntitySlot
	 * @return {Integer}
	 */
	_getFreeEntitySlot () {
		for(let e = 0, len = this.entities.length; e < len; e++){
			let entity = this.entities[e];
			if(entity == null || entity == undefined){
				return e;
			}
		}
		return null;
	}

	/**
	 * recycle systemslot
	 * @method _getFreeProcessSystemSlot
	 * @return {Integer}
	 */
	_getFreeProcessSystemSlot () {
		for(let s = 0, len = this.entitySystems.length; s < len; s++){
			let system = this.entitySystems[s];
			if(system == undefined || system == null ){
				return s;
			}
		}
		return null;
	}

	/**
	 * recycle systemslot
	 * @method _getFreeVoidSystemSlot
	 */
	_getFreeVoidSystemSlot () {
		for(let s = 0, len = this.voidSystems.length; s < len; s++){
			let system = this.voidSystems[s];
			if(system == undefined || system == null ){
				return s;
			}
		}
		return null;
	}

	/**
	 * notify systems for new entity
	 * @method _entityAdded
	 * @param {cxEntity} entity
	 */
	_entityAdded ( entity ){
		for(let s=0,len=this.voidSystems.length; s<len;s++) {
			let system = this.voidSystems[s];
			system.added(entity);
		}

		for(let s=0,len=this.entitySystems.length; s<len;s++) {
			let system = this.entitySystems[s];
			system.added(entity);
		}
	}

	/**
	 * notify systems for deleted entity
	 * @method _entityDeleted
	 * @param {cxEntity} entity
	 */
	_entityDeleted ( entity ) {
		for(let s=0,len=this.voidSystems.length; s<len;s++) {
			let system = this.voidSystems[s];
			system.removed(entity);
		}

		for(let s=0,len=this.entitySystems.length; s<len;s++) {
			let system = this.entitySystems[s];
			system.removed(entity);
		}
	}

}
