"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cxSystem2 = require('../cxSystem');

var _cxSystem3 = _interopRequireDefault(_cxSystem2);

var _NotImplemented = require('../Exception/NotImplemented');

var _NotImplemented2 = _interopRequireDefault(_NotImplemented);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* @class cxEntitySystem
*/
var cxEntitySystem = function (_cxSystem) {
	_inherits(cxEntitySystem, _cxSystem);

	function cxEntitySystem() {
		_classCallCheck(this, cxEntitySystem);

		/**
   * @property components
   * @type {Array<String>}
   */
		var _this = _possibleConstructorReturn(this, (cxEntitySystem.__proto__ || Object.getPrototypeOf(cxEntitySystem)).call(this));

		_this.components = [];

		/**
   * @type {String}
   */
		_this.type = _cxSystem3.default.getTypeProcess();
		return _this;
	}

	/**
  * @method update
  * @param {cxEntity} entity
  * @param {Array<cxComponent>} components
  */


	_createClass(cxEntitySystem, [{
		key: 'update',
		value: function update(entity, components) {
			throw new _NotImplemented2.default();
		}
	}]);

	return cxEntitySystem;
}(_cxSystem3.default);

exports.default = cxEntitySystem;