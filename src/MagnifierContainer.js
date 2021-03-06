import React, { Component } from "react";
import PropTypes from "prop-types";
import { defaultState } from "react-input-position";
import utils from "./utils";

export const MagnifierContext = React.createContext();

class MagnifierContainer extends Component {
  state = {
    inputPositionState: defaultState,
    zoomImageDimensions: {},
    zoomContainerDimensions: {}
  };
  zoomContainerRef = React.createRef();

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  };

  getZoomContainerDimensions = () => {
    if (!this.zoomContainerRef.current) {
      return { width: 0, height: 0 };
    }

    const {
      width,
      height
    } = this.zoomContainerRef.current.getBoundingClientRect();

    return { width, height };
  };

  onUpdate = changes => {
    this.setState({ inputPositionState: changes });
  };

  onZoomImageLoad = e => {
    const rect = e.target.getBoundingClientRect();

    this.setState({
      zoomImageDimensions: {
        width: rect.width,
        height: rect.height
      }
    });
  };

  getContextValue() {
    return {
      stateOverride: this.state.inputPositionState,
      isActive: this.state.inputPositionState.active,
      onUpdate: this.onUpdate,
      zoomImageDimensions: this.state.zoomImageDimensions,
      zoomRef: this.zoomContainerRef,
      onZoomImageLoad: this.onZoomImageLoad,
      ...this.calculatePositions()
    };
  }

  calculatePositions() {
    const { elementDimensions, itemPosition } = this.state.inputPositionState;
    const { zoomImageDimensions } = this.state;
    const zoomContainerDimensions = this.getZoomContainerDimensions();

    const smallImageSize = {
      width: elementDimensions.width,
      height: elementDimensions.height
    };

    const previewSize = {
      width: Math.floor(
        smallImageSize.width *
          (zoomContainerDimensions.width / zoomImageDimensions.width)
      ),
      height: Math.floor(
        smallImageSize.height *
          (zoomContainerDimensions.height / zoomImageDimensions.height)
      )
    };

    let position = { x: 0, y: 0 };
    const itemPositionAdj = { ...itemPosition };

    const previewOffset = {
      x: previewSize.width / 2,
      y: previewSize.height / 2
    };

    itemPositionAdj.x = Math.max(previewOffset.x, itemPositionAdj.x);
    itemPositionAdj.x = Math.min(
      smallImageSize.width - previewOffset.x,
      itemPositionAdj.x
    );
    itemPositionAdj.y = Math.max(previewOffset.y, itemPositionAdj.y);
    itemPositionAdj.y = Math.min(
      smallImageSize.height - previewOffset.y,
      itemPositionAdj.y
    );

    position = { ...itemPositionAdj };

    position.x = utils.convertRange(
      previewOffset.x,
      smallImageSize.width - previewOffset.x,
      zoomImageDimensions.width * -1 + zoomContainerDimensions.width,
      0,
      position.x
    );
    position.y = utils.convertRange(
      previewOffset.y,
      smallImageSize.height - previewOffset.y,
      zoomImageDimensions.height * -1 + zoomContainerDimensions.height,
      0,
      position.y
    );

    position.x = utils.invertNumber(
      zoomImageDimensions.width * -1 + zoomContainerDimensions.width,
      0,
      position.x
    );
    position.y = utils.invertNumber(
      zoomImageDimensions.height * -1 + zoomContainerDimensions.height,
      0,
      position.y
    );

    previewSize.left = Math.floor(itemPositionAdj.x - previewOffset.x) || 0;
    previewSize.right = Math.floor(itemPositionAdj.x + previewOffset.x) || 0;
    previewSize.top = Math.floor(itemPositionAdj.y - previewOffset.y) || 0;
    previewSize.bottom = Math.floor(itemPositionAdj.y + previewOffset.y) || 0;

    return {
      position,
      smallImageSize,
      previewSize,
      zoomContainerDimensions
    };
  }

  render() {
    const { style, className } = this.props;

    return (
      <div style={style} className={className}>
        <MagnifierContext.Provider value={this.getContextValue()}>
          {this.props.children}
        </MagnifierContext.Provider>
      </div>
    );
  }
}

export default MagnifierContainer;
