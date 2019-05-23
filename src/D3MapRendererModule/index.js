import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { global } from 'lib/styled/global';

const {
  bp,
  colorsPalette,
  mediaQueries,
} = global;

const { mediaMax } = mediaQueries;
const { colorsDx, colorsUi } = colorsPalette;

const StyledSvg = styled.svg`
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

const StyledCanvas = styled.canvas`
  position: absolute;
`;

const mapDOMId = 'maps_d3';

class D3MapRenderer extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      initializeMap,
    } = this.props;

    initializeMap(mapDOMId);
  }

  render() {
    const {
      onMouseMove,
      partyColors,
    } = this.props;

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

D3MapRenderer.propTypes = {
  initializeMap: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func,
  partyColors: PropTypes.array,
};

export default D3MapRenderer;
