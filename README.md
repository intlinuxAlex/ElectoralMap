# ElectoralMap

A package that displays an electoral map via D3 (v4) and GES payloads.
Built for a uninominal system, this module can support any of these types of elections, on a provincial or national scale.

## Installation

```npm
npm i --save electoralmap
```

## Required parameters
    allParties: An object containing an array of objects which contain all relevant information about a single party.
        ```
        acronym: "IND"
        chiefId: 0
        color: "rgb(102,102,102)"
        id: 3033
        name: "Indépendant"
        priority: 5
        ```

    allRidings: An object containing all 
    allowClick={allowClickForMap}
    allowZoom={allowZoomForMap}
    ButtonV2={ButtonV2}
    currentPan={currentPan}
    currentRidingId={currentRidingId}
    e6nHardcodedRidingIdFix={e6nHardcodedRidingIdFix}
    E6N_PAGE_IDS={E6N_PAGE_IDS}
    E6NToolTip={E6NToolTip}
    forwardMapRef={forwardMapRef}
    global={global}
    isRidingOpen={isRidingOpen}
    isWidget={isWidget}
    mapData={mapData}
    setCurrentRiding={setCurrentRidingAction}
    setCurrentRidingTooltip={setCurrentRidingTooltipAction}
    setCurrentPan={setCurrentPanAction}
    setCurrentZoom={setCurrentZoomAction}
    StyledMap={StyledMap}
    zoomLevel={zoomLevel}
    d3SourceScript="/unit/static/e6n/bundle-d3-topojson.js"