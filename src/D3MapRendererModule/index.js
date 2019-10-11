const React = require('react');
const Component = require('react');

let StyledSvg = null;
let StyledCanvas = null;

class D3MapRendererModule extends React.Component {
  constructor(props) {
   super(props);
    const {
      styledComponents,
      stylingConstants,
    } = this.props;

    const {
      BREAKPOINTS,
      colorsPalette,
      mediaQueries,
    } = stylingConstants;

    const {
      styled,
      css,
    } = styledComponents;

    const bp = BREAKPOINTS;
    const { mediaMax } = mediaQueries;
    const { colorsDx, colorsUi } = colorsPalette;

    StyledSvg = styled.svg`
      background-color: ${colorsDx.white};
      display: block;
      fill : ${colorsUi.lightgrey};
      overflow: hidden;
      position: absolute;
  
    path {
      cursor: pointer !important;
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
      mapDOMContextId,
    } = this.props;
    
    initializeMap(mapDOMContextId);
  }

  componentDidUpdate(prevProps) {
    const {
      electionId,
      initializeMap,
      mapDOMContextId,
    } = this.props;

    if (prevProps.electionId !== electionId) {
      initializeMap(mapDOMContextId);
    }
  }

  render() {
    const {
      electionId,
      onMouseMove,
      mapDOMContextId,
      partyColors,
    } = this.props;

    console.log("Ton mapDOMContextId dans D3MapRendererModule: ", mapDOMContextId);
    return (
      <>
        <StyledCanvas
          height="4"
          width="3"
        >
        </StyledCanvas>
        <StyledSvg
          key={`${mapDOMContextId}-${electionId}`}
          id={mapDOMContextId}
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