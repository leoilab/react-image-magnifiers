import React from "react";
import utils from "./utils";

const Image = React.forwardRef(function(props, ref) {
  const { onImageError, onImageLoad, onLoadRefresh, src, alt, ...otherProps } = props;

  const [imageIdx, setImageIdx] = React.useState(0);
  const imageErrorRef = React.useRef(false);
  const imageArr = src.constructor === Array ? src : [src];
  const imageSrc = imageArr[imageIdx];

  return (
    <img
      ref={ref}
      src={imageSrc}
      alt={alt}
      onLoad={e => {
        onImageLoad(e);

        if (imageErrorRef.current) {
          onLoadRefresh();
        }
      }}
      onError={error => {
        onImageError({error, src: imageSrc});
        if (imageIdx < imageArr.length) {
          imageErrorRef.current = true;
          setImageIdx(idx => idx + 1);
        }
      }}
      {...otherProps}
    />
  );
});

Image.defaultProps = {
  onImageError: utils.noop,
  onImageLoad: utils.noop,
  onLoadRefresh: utils.noop
};

export default Image;
