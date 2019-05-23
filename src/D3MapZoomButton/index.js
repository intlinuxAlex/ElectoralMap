
module.exports = {
  D3MapZoomButton,
};

import React from 'react';
import Button from 'components/elements/ButtonV2';

import { global } from 'lib/styled/global';

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

const StyledResetButton = styled(Button)`
  bottom: 20px;
  left: 20px;
  position: absolute;
  z-index: 10;

  .svg-icon {
    fill: ${colorsDx.black}
  }
`;

const D3MapZoomButton = ({
  currentPan,
  onClick,
  zoomLevel,
}) => {
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

