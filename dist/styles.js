"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function getLargeImageStyle(positionX, positionY, active) {
  return {
    position: "absolute",
    boxSizing: "border-box",
    display: "block",
    top: 0,
    left: 0,
    transform: "translate(".concat(positionX, "px, ").concat(positionY, "px)"),
    zIndex: "1",
    visibility: !active ? "hidden" : "visible",
    width: "auto"
  };
}

function getZoomContainerStyle(width, height, inPlace) {
  return {
    position: "absolute",
    boxSizing: "border-box",
    pointerEvents: "none",
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    right: "".concat(inPlace ? 0 : width, "px"),
    top: "0",
    overflow: "hidden"
  };
}

function getOverlayCenterStyle(width, height, left, top, opacity, transitionSpeed) {
  return {
    position: "absolute",
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    left: 0,
    top: 0,
    boxSizing: "border-box",
    transform: "translate(".concat(left, "px, ").concat(top, "px)"),
    border: "1px solid white",
    opacity: opacity,
    transition: "opacity ".concat(transitionSpeed, "s ease"),
    zIndex: "15",
    pointerEvents: "none"
  };
}

function getOverlayTopStyle(width, height, opacity, transitionSpeed) {
  return {
    backgroundColor: "#000",
    position: "absolute",
    boxSizing: "border-box",
    top: 0,
    left: 0,
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    zIndex: "10",
    transition: "opacity ".concat(transitionSpeed, "s ease"),
    opacity: opacity,
    transform: "scale3d(1,1,1)",
    pointerEvents: "none"
  };
}

function getOverlayLeftStyle(width, height, top, opacity, transitionSpeed) {
  return {
    backgroundColor: "#000",
    position: "absolute",
    boxSizing: "border-box",
    width: "".concat(width, "px"),
    top: "".concat(top, "px"),
    left: 0,
    height: "".concat(height, "px"),
    zIndex: "10",
    transition: "opacity ".concat(transitionSpeed, "s ease"),
    opacity: opacity,
    transform: "scale3d(1,1,1)",
    pointerEvents: "none"
  };
}

function getOverlayRightStyle(width, height, top, opacity, transitionSpeed) {
  return {
    backgroundColor: "#000",
    position: "absolute",
    boxSizing: "border-box",
    top: "".concat(top, "px"),
    right: 0,
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    zIndex: "10",
    transition: "opacity ".concat(transitionSpeed, "s ease"),
    opacity: opacity,
    transform: "scale3d(1,1,1)",
    pointerEvents: "none"
  };
}

function getOverlayBottomStyle(width, height, top, opacity, transitionSpeed) {
  return {
    backgroundColor: "#000",
    position: "absolute",
    boxSizing: "border-box",
    top: "".concat(top, "px"),
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    zIndex: "10",
    transition: "opacity ".concat(transitionSpeed, "s ease"),
    opacity: opacity,
    transform: "scale3d(1,1,1)",
    pointerEvents: "none"
  };
}

function getMagnifierZoomStyle(active, transitionSpeed) {
  return {
    position: "relative",
    opacity: active ? 1 : 0,
    transition: "opacity ".concat(transitionSpeed, "s ease")
  };
}

var _default = {
  getLargeImageStyle: getLargeImageStyle,
  getZoomContainerStyle: getZoomContainerStyle,
  getOverlayCenterStyle: getOverlayCenterStyle,
  getOverlayTopStyle: getOverlayTopStyle,
  getOverlayLeftStyle: getOverlayLeftStyle,
  getOverlayRightStyle: getOverlayRightStyle,
  getOverlayBottomStyle: getOverlayBottomStyle,
  getMagnifierZoomStyle: getMagnifierZoomStyle
};
exports["default"] = _default;