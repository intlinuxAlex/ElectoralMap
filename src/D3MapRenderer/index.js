const React = require('react');
const Component = require('react');
const D3MapRendererModule = require('../D3MapRendererModule'); 

class D3MapRenderer extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      allowClick,
      focusRiding,
      currentRidingId,
      e6nHardcodedRidingIdFix,
    } = this.props;
    let currentId = null;
    let feature = null;

    if (currentRidingId && currentRidingId > -1 && currentRidingId !== prevProps.currentRidingId) {
      const paths = window.d3.selectAll('path');
      // eslint-disable-next-line no-underscore-dangle
      for (let i = 0; i < paths._groups[0].length; i += 1) { // eslint-disable-next-line no-underscore-dangle
        const node = paths._groups[0][i];

        if (Number(node.id) + e6nHardcodedRidingIdFix === currentRidingId) {
          currentId = Number(node.id);
          // eslint-disable-next-line no-underscore-dangle
          feature = node.__data__;
          break;
        }
      }

      if (feature && allowClick) {
        focusRiding(feature, currentId);
      }
    }
  }

  render() {
    const {
      allParties,
      currentRidingId,
      initializeMap,
      global,
      onMouseMove,
      mapDOMContextId,
      setCurrentRiding: setCurrentRidingAction,
    } = this.props;

    const partyColors = [];
    if (allParties) {
      const allPartiesArray = Object.values(allParties);
      for (let i = 0; i < allPartiesArray.length; i += 1) {
        const colorString = `.s${allPartiesArray[i].id} { fill: ${allPartiesArray[i].color};}`;
        partyColors.push(colorString);
      }
    }

    return (
      <D3MapRendererModule
        closePopup={() => setCurrentRidingAction(-1, E6N_PAGE_IDS.lists)}
        currentRidingId={currentRidingId}
        initializeMap={initializeMap}
        onMouseMove={onMouseMove}
        partyColors={partyColors}
        global={global}
        mapDOMContextId={mapDOMContextId}
      />
    );
  }
}

module.exports = D3MapRenderer;