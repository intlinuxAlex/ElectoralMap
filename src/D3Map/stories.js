import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs';
import {
  boolean,
  object,
  select,
} from '@storybook/addon-knobs/dist/deprecated';
import { Provider } from 'react-redux';
import getAppStore from 'redux/store';
import d3TopoJsonJs from 'assets/e6n/bundle-d3-topojson';
import README from './README.md';
import mockData from './tests/mockData.json';
import D3Map from './index';

const mockFakeRidings = [];
for (let i = 0; i < 21350; i += 1) {
  if (i === 21349) {
    mockFakeRidings.push(mockData.fakeRiding);
  } else {
    mockFakeRidings.push(null);
  }
}
const mockPan = {
  transformX: 0,
  transformY: 0,
};

storiesOf('Scoped Components|E6N.Election/30.Module/30.E6N.045-D3Map', module)
  .addDecorator(withReadme(README))
  .addDecorator(withKnobs)
  .add('Default', () => {
    const knobRidingSelect = select('Centrer sur une circonscription', {
      Aucune: 0,
      FortMcMurray_LacLaBiche: 21349,
      Central_Peace_Notley: 21344,
      Edmonton_Strathcona: 21333,
    }, zoomLevel);
    const zoomLevel = knobRidingSelect > 0 ? 5 : 0;
    const map = (
      <Provider store={getAppStore()}>
        <div id="map-only" style={{ height: '300px' }}>
          <div id="search-map">
            <D3Map
              allRidings={mockFakeRidings}
              allParties={object('Assigner une avance à un parti dans une circonscription', mockData.fakeParty)}
              allowClick={boolean('Permet une translation + zoom au click sur une circonscription', true)}
              allowZoom={boolean('Permet de déplacer et zoomer la carte', true)}
              currentPan={mockPan}
              currentRidingId={knobRidingSelect}
              d3SourceScript={d3TopoJsonJs}
              forwardMapRef={() => {}}
              isRidingOpen={false}
              isWidget={boolean('Est un widget', true)}
              mapData={mockData.fakeMapData}
              setCurrentRiding={() => {}}
              setCurrentRidingTooltip={() => {}}
              setCurrentPan={() => {}}
              setCurrentZoom={() => {}}
              zoomLevel={zoomLevel}
            />
          </div>
        </div>
      </Provider>
    );
    return map;
  });
