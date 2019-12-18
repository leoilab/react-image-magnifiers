"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = _interopRequireDefault(require("./utils"));

var _styles = _interopRequireDefault(require("./styles"));

var _Image = _interopRequireDefault(require("./Image"));

var _ImagePreviewOverlay = _interopRequireDefault(require("./ImagePreviewOverlay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SideBySideRenderer = function SideBySideRenderer(props) {
  var itemPosition = props.itemPosition,
      active = props.active,
      elementDimensions = props.elementDimensions,
      elementOffset = props.elementOffset,
      itemDimensions = props.itemDimensions,
      imageSrc = props.imageSrc,
      largeImageSrc = props.largeImageSrc,
      imageAlt = props.imageAlt,
      itemRef = props.itemRef,
      overlayOpacity = props.overlayOpacity,
      overlayBoxOpacity = props.overlayBoxOpacity,
      alwaysInPlace = props.alwaysInPlace,
      transitionSpeed = props.transitionSpeed,
      transitionSpeedInPlace = props.transitionSpeedInPlace,
      renderOverlay = props.renderOverlay,
      cursorStyle = props.cursorStyle,
      onImageLoad = props.onImageLoad,
      onLargeImageLoad = props.onLargeImageLoad,
      onLoadRefresh = props.onLoadRefresh;
  var inPlace = false;

  try {
    inPlace = alwaysInPlace || elementDimensions.width * 2 + elementOffset.right > window.innerWidth;
  } catch (e) {}

  var legalSize = itemDimensions.width > elementDimensions.width;
  var isActive = legalSize && active;
  var transSpeed = inPlace ? transitionSpeedInPlace : transitionSpeed;
  var smallImageSize = {
    width: elementDimensions.width,
    height: elementDimensions.height
  };
  var previewSize = {
    width: Math.floor(smallImageSize.width * (smallImageSize.width / itemDimensions.width)),
    height: Math.floor(smallImageSize.height * (smallImageSize.height / itemDimensions.height))
  };
  var position = {
    x: 0,
    y: 0
  };

  var itemPositionAdj = _objectSpread({}, itemPosition);

  var previewOffset = {
    x: inPlace ? 0 : previewSize.width / 2,
    y: inPlace ? 0 : previewSize.height / 2
  };
  itemPositionAdj.x = Math.max(previewOffset.x, itemPositionAdj.x);
  itemPositionAdj.x = Math.min(smallImageSize.width - previewOffset.x, itemPositionAdj.x);
  itemPositionAdj.y = Math.max(previewOffset.y, itemPositionAdj.y);
  itemPositionAdj.y = Math.min(smallImageSize.height - previewOffset.y, itemPositionAdj.y);
  position = _objectSpread({}, itemPositionAdj);
  position.x = _utils["default"].convertRange(previewOffset.x, smallImageSize.width - previewOffset.x, itemDimensions.width * -1 + smallImageSize.width, 0, position.x);
  position.y = _utils["default"].convertRange(previewOffset.y, smallImageSize.height - previewOffset.y, itemDimensions.height * -1 + smallImageSize.height, 0, position.y);
  position.x = _utils["default"].invertNumber(itemDimensions.width * -1 + smallImageSize.width, 0, position.x);
  position.y = _utils["default"].invertNumber(itemDimensions.height * -1 + smallImageSize.height, 0, position.y);
  previewSize.left = Math.floor(itemPositionAdj.x - previewOffset.x) || 0;
  previewSize.right = Math.floor(itemPositionAdj.x + previewOffset.x) || 0;
  previewSize.top = Math.floor(itemPositionAdj.y - previewOffset.y) || 0;
  previewSize.bottom = Math.floor(itemPositionAdj.y + previewOffset.y) || 0;
  return _react["default"].createElement("div", {
    style: {
      position: "relative",
      overflow: inPlace ? "hidden" : "visible"
    }
  }, _react["default"].createElement(_Image["default"], {
    style: {
      width: "100%",
      display: "block",
      cursor: legalSize ? cursorStyle : "default"
    },
    src: imageSrc,
    alt: imageAlt,
    onImageLoad: onImageLoad,
    onLoadRefresh: onLoadRefresh
  }), _react["default"].createElement("div", {
    style: _objectSpread({}, _styles["default"].getZoomContainerStyle(smallImageSize.width, smallImageSize.height, inPlace), {
      opacity: isActive ? "1" : "0",
      transition: "opacity ".concat(transSpeed, "s ease")
    })
  }, _react["default"].createElement(_Image["default"], {
    style: _styles["default"].getLargeImageStyle(position.x, position.y, true),
    src: largeImageSrc || imageSrc,
    alt: imageAlt,
    ref: itemRef,
    onImageLoad: onLargeImageLoad,
    onLoadRefresh: onLoadRefresh
  })), _react["default"].createElement(_ImagePreviewOverlay["default"], {
    previewWidth: previewSize.width,
    previewHeight: previewSize.height,
    previewPosLeft: previewSize.left,
    previewPosRight: previewSize.right,
    previewPosTop: previewSize.top,
    previewPosBottom: previewSize.bottom,
    imageWidth: smallImageSize.width,
    imageHeight: smallImageSize.height,
    overlayOpacity: overlayOpacity,
    overlayBoxOpacity: overlayBoxOpacity,
    active: isActive && !inPlace,
    transitionSpeed: transSpeed
  }), renderOverlay ? renderOverlay(active) : null);
};

var _default = SideBySideRenderer;
exports["default"] = _default;