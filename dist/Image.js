"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Image = _react["default"].forwardRef(function (props, ref) {
  var onImageError = props.onImageError,
      onImageLoad = props.onImageLoad,
      onLoadRefresh = props.onLoadRefresh,
      src = props.src,
      alt = props.alt,
      otherProps = _objectWithoutProperties(props, ["onImageError", "onImageLoad", "onLoadRefresh", "src", "alt"]);

  var _React$useState = _react["default"].useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      imageIdx = _React$useState2[0],
      setImageIdx = _React$useState2[1];

  var imageErrorRef = _react["default"].useRef(false);

  var imageArr = src.constructor === Array ? src : [src];
  var imageSrc = imageArr[imageIdx];
  return _react["default"].createElement("img", _extends({
    ref: ref,
    src: imageSrc,
    alt: alt,
    onLoad: function onLoad(e) {
      onImageLoad(e);

      if (imageErrorRef.current) {
        onLoadRefresh();
      }
    },
    onError: function onError(error) {
      onImageError({
        error: error,
        src: imageSrc
      });

      if (imageIdx < imageArr.length) {
        imageErrorRef.current = true;
        setImageIdx(function (idx) {
          return idx + 1;
        });
      }
    }
  }, otherProps));
});

Image.defaultProps = {
  onImageError: _utils["default"].noop,
  onImageLoad: _utils["default"].noop,
  onLoadRefresh: _utils["default"].noop
};
var _default = Image;
exports["default"] = _default;