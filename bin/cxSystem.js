"use strict";

/**
 * Abstract System
 * @class cxSystem
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cxSystem = function () {
  function cxSystem() {
    _classCallCheck(this, cxSystem);

    /**
     * @property tag
     * @type {String}
     */
    this.tag = null;

    /**
     * @property world
     * @type {cxWorld}
     */
    this.world = null;
  }

  /**
   * get notified when system is added to world
   * @method addedToWorld
   */


  _createClass(cxSystem, [{
    key: "addedToWorld",
    value: function addedToWorld() {}

    /**
     * get notified when entity is added to world
     * @method added
     * @param {cxEntity} entity
     */

  }, {
    key: "added",
    value: function added(entity) {}

    /**
     * get notified when entity is removed from world
     * @method removed
     * @param {cxEntity} entity
     */

  }, {
    key: "removed",
    value: function removed(entity) {}

    /**
     * 
     * @return string
     */

  }], [{
    key: "getTypeProcess",
    value: function getTypeProcess() {
      return "type_process";
    }

    /**
     * @return string
     */

  }, {
    key: "getTypeVoid",
    value: function getTypeVoid() {
      return "type_void";
    }
  }]);

  return cxSystem;
}();

exports.default = cxSystem;