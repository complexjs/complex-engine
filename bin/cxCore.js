'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InvalidClass = require('./Exception/InvalidClass');

var _InvalidClass2 = _interopRequireDefault(_InvalidClass);

var _cxScene = require('./cxScene');

var _cxScene2 = _interopRequireDefault(_cxScene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Complex Core
 * @class cxCore
 */
var cxCore = function () {
	function cxCore() {
		_classCallCheck(this, cxCore);

		/**
   * @property scene
   * @type {cxScene}
   */
		this.scene = null;
	}

	/**
  * load a scene to be rendered
  * @method loadScene
  * @param {cxScene} scene
  */


	_createClass(cxCore, [{
		key: 'loadScene',
		value: function loadScene(scene) {
			if (scene instanceof _cxScene2.default === false) {
				throw new _InvalidClass2.default('cxScene');
			}
			scene.cx = this;
			this.scene = scene;
			this.scene.load();
		}

		/**
   * render the loaded scene
   * @method update
   */

	}, {
		key: 'update',
		value: function update() {
			this.scene.update();
		}

		/**
   * Start the render loop
   * @method start
   */

	}, {
		key: 'start',
		value: function start() {
			// shim layer with setTimeout fallback
			window.requestAnimFrame = function () {
				return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
			}();

			this._animFrame();
		}

		/**
   * The animation frame
   * @method _animFrame
   */

	}, {
		key: '_animFrame',
		value: function _animFrame() {
			var _this = this;

			requestAnimFrame(function () {
				_this._animFrame();
			});
			this.update();
		}
	}]);

	return cxCore;
}();

exports.default = cxCore;
;