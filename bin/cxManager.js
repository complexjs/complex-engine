"use strict";

/**
 * @class cxManager
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cxManager = function () {
  function cxManager() {
    _classCallCheck(this, cxManager);

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
   * @method getTag
   * @return {String}
   */


  _createClass(cxManager, [{
    key: "getTag",
    value: function getTag() {
      return this.tag;
    }

    /**
     * @method getWorld
     * @return {cxWorld}
     */

  }, {
    key: "getWorld",
    value: function getWorld() {
      return this.world;
    }
  }]);

  return cxManager;
}();

exports.default = cxManager;