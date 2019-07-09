const React = require('react');

const thresholds = {
  X: 50,
  Y: 50,
  Z: 1,
};

class D3MapZoomButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      Button,
      currentPan,
      onClick,
      currentZoom,
    } = this.props;

      return (
        <Button
          icon="svg-zoomout"
          isIconFlag
          onClick={onClick}
          scope="secondary"
          type="button"
          isDisabled={!(currentZoom > thresholds.Z ||(currentPan && (Math.abs(currentPan.transformX) > thresholds.X || Math.abs(currentPan.transformY) > thresholds.Y)))}
        />
      );
    }
}
module.exports = D3MapZoomButton;
