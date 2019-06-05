const React = require('react');
const Component = require('react');

const thresholds = {
  X: 50,
  Y: 50,
  Z: 1,
};

class D3MapZoomButton extends React.Component {

  constructor(props) {
    super(props);
    this.StyledResetButton = null;
  }

  componentDidMount() {
    const {
      ZoomOutButton,
      styledComponents,
      stylingConstants,
    } = this.props;

    const {
      styled,
      css,
    } = styledComponents; 

    const {
      colorsPalette
    } = stylingConstants;

    const { colorsDx } = colorsPalette;

    this.StyledResetButton = styled(ZoomOutButton)`
      bottom: 20px;
      left: 20px;
      position: absolute;
      z-index: 10;
  
      .svg-icon {
        fill: ${colorsDx.black}
      }
    `;
  }

  render() {
    const {
      ZoomOutButton,
      currentPan,
      onClick,
      currentZoom,
    } = this.props;
    const StyledResetButton = this.StyledResetButton;

    if (currentZoom > thresholds.Z || (currentPan && (Math.abs(currentPan.transformX) > thresholds.X || Math.abs(currentPan.transformY) > thresholds.Y))) {
      return (
        <StyledResetButton
          icon="svg-zoomout"
          isIconFlag
          onClick={onClick}
          scope="secondary"
          type="button"
        />
      );
    }
    return null;
  }
}
module.exports = D3MapZoomButton;
