const React = require('react');
const Component = require('react');

let StyledResetButton = null;

const D3MapZoomButton = ({
  ButtonV2,
  currentPan,
  onClick,
  zoomLevel,
  global,
}) => {

  const {
    colorsPalette,
    styled,
  } = global;
  
  const { colorsDx } = colorsPalette;
  
  const thresholds = {
    X: 50,
    Y: 50,
    Z: 1,
  };
  

  StyledResetButton = styled(ButtonV2)`
     bottom: 20px;
     left: 20px;
     position: absolute;
     z-index: 10;
  
     .svg-icon {
       fill: ${colorsDx.black}
     }
   `;

  if (zoomLevel > thresholds.Z || (currentPan && (Math.abs(currentPan.transformX) > thresholds.X || Math.abs(currentPan.transformY) > thresholds.Y))) {
    return (
      <StyledResetButton
        icon="svg-zoomout"
        id="zoomContainer"
        isIconFlag
        onClick={onClick}
        scope="secondary"
        type="button"
      />
    );
  }
  return null;
};
module.exports = D3MapZoomButton;
