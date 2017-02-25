"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cxWorld = require('./cxWorld');

var _cxWorld2 = _interopRequireDefault(_cxWorld);

var _NotImplemented = require('./Exception/NotImplemented');

var _NotImplemented2 = _interopRequireDefault(_NotImplemented);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The current scene with is rendered on screen
 * @class cxScene
 */
var cxScene = function () {
  /**
   * @method constructor
   * @param {String} name
   */
  function cxScene(name) {
    _classCallCheck(this, cxScene);

    /**
     * @property name
     * @type {String}
     */
    this.name = name;

    /**
     * @property world
     * @type {cxWorld}
     */
    this.world = new _cxWorld2.default();

    /**
     * @property cx
     * @type {Complex}
     */
    this.cx = null;
  }

  /**
   * Called when the world is loaded by the ComplexCore
   * @method load
   */


  _createClass(cxScene, [{
    key: 'load',
    value: function load() {
      throw new _NotImplemented2.default();
    }

    /**
     * Updates the worldobject
     * @method update
     */

  }, {
    key: 'update',
    value: function update() {
      this.world.step();
    }
  }]);

  return cxScene;
}();

exports.default = cxScene;