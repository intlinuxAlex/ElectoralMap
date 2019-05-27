const React = require('react');
const Component = require('react');
const style = require('styled-components');
const { css } = require('styled-components');

let StyledSvg = null;
let StyledCanvas = null;

const mapDOMId = 'maps_d3';

class D3MapRendererModule extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const {
      global
    } = this.props;

    const {
      bp,
      colorsPalette,
      mediaQueries,
      styled,
    } = global;

    const { mediaMax } = mediaQueries;
    const { colorsDx, colorsUi } = colorsPalette;

    StyledSvg = styled.svg`
    background-color: ${colorsDx.white};
    display: block;
    fill : ${colorsUi.lightgrey};
    overflow: hidden;
    position: absolute;
    min-height: 300px;
  
  
    ${mediaMax(bp.SM.max, `
      max-height: 50vh;
    `)}
  
    path {
      cursor: pointer;
      stroke: white;
      stroke-width: 0.5px;
      -webkit-backface-visibility;
    }
  
    ${({ partyColors }) => {
      if (partyColors) {
        let styles = '';
        partyColors.forEach((element) => {
          styles += `${element} `;
        });
  
        return css`${styles}`;
      }
      return null;
    }}
  
    .flash-it {
      animation-duration: 1666ms;
      animation-fill-mode: both;
      animation-iteration-count: 3;
      animation-name: flash;
      animation-play-state: running;
      animation-timing-function: ease-in-out;
      background-color: ${colorsUi.lightgrey};
      opacity: .6;
    }
  
    @keyframes flash {
      0% {opacity: .6;}
      50% {opacity: 1;}
      100% {opacity: .6;}
    }
  
    path:hover,
    path.highlighted {
        fill-opacity: .6;
    }
  
    .mobile & path:hover,
    .mobile & path.highlighted,
    .ios & path:hover,
    .ios & path.highlighted,
    .android & path:hover,
    .android & path.highlighted {
        fill-opacity: 1;
    }
  `;

  StyledCanvas = styled.canvas`
    position: absolute;
  `;
  }
  
  componentDidMount() {
    const {
      initializeMap,
    } = this.props;

    initializeMap(mapDOMId);
  }

  render() {
    const {
      global,
      onMouseMove,
      partyColors,
    } = this.props;

    const {
      bp,
      colorsPalette,
      mediaQueries,
      styled,
    } = global;

    const { mediaMax } = mediaQueries;
    const { colorsDx, colorsUi } = colorsPalette;

    return (
      <>
        <StyledCanvas
          height="4"
          width="3"
        >
        </StyledCanvas>
        <StyledSvg
          id={mapDOMId}
          onMouseMove={onMouseMove}
          partyColors={partyColors}
        >
          <g className="map"></g>
          <g className="bounding-box">
            <rect></rect>
          </g>
        </StyledSvg>
      </>
    );
  }
}

module.exports = D3MapRendererModule;