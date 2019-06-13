# ElectoralMap

A package that displays an electoral map via D3 (v4) and GES payloads.
Built for a uninominal system, this module can support any of these types of elections, on a provincial or national scale.
The module comes with its own built-in breakpoint and color constants.
It requires from its parent a bundle of utilities imported from "styled-components", notably the "styled" and "css" functions. 
## Installation

```npm
npm i --save electoral-map
```

## Parameters
### Optional Parameters
    allParties: An object containing an array of objects which contain relevant information about a single party.
        {
            acronym: "IND"
            chiefId: 0
            color: "rgb(102,102,102)"
            id: 3033
            name: "Indépendant"
            priority: 5
        }

    allRidings: An object containing an array of objects which contain basic information about a single riding.
        {
            21377: {
                candidateIds: [
                    105284,
                    105285,
                    105287,
                ]
                id: 21377
                name: "SOURIS-ELMIRA"
                searchableName: "souris elmira"
            }
        }

    allowClick: A boolean value dictating wether the viewer of the map can click on a riding to access its detailed information

    allowZoom: A boolean value dictating wether the viewer of the map can zoom/pan in or out.

    ZoomOutButton: An object which forms the basis of a styled-component Button (used for resetting the zoom and pan level).

    currentRidingId: An integer representing the current active riding. -1 if no riding is active.

    e6nHardcodedRidingIdFix: An integer to facilitate tests between different GES datasets. Since array indices start at 0 but GES data can start at any index,         this is used to easily calibrate your indices with those of the GES.

    E6N_PAGE_IDS: An object that contains ids of other DOM elements which must interact and reflect map interactions (clicks on ridings)
        {
            alerts: "e6n-alerts-id"
            lists: "e6n-lists-id"
            search: "e6n-search-id"
        }

    E6NToolTip: A styled object which is displayed on hovering over a riding or polygon.

    forwardMapRef: A function ref propagated to link the D3Map to its parent container.
    
    isRidingOpen: A boolean representing wether a riding is currently open. 

    isWidget: A boolean indicating wether the map lives within its natural context (the electoral/E6N page) or within a newsstory document as a widget.

    setCurrentRiding: An action/reducer which sends the current riding id into the Redux Store.

    setCurrentRidingTooltip: An action/reducer which sends the current riding name into the Redux Store.

    d3SourceScript: A string containing the path to the bundled d3 library. Default: "https://ici.radio-canada.ca/unit/static/e6n/bundle-d3-topojson.js"

### Required parameters
    styledComponents: An object containing functions and other objects extracted from the 'styled-components' npm library, notably the "styled" and "css" functions. 

    mapData: An object with various map configurations 
        {
            height: 600 (Default height)
            initialProjectionScale: 22 (Default scale multiplier)
            mapConfigurations:  [  (For every breakpoint between the lower and higher boundary, on a riding click, center the riding at the 1/(widthDifferential) of the container)
                {
                    higherBoundary: 1024 
                    lowerBoundary: 0
                    widthDifferential: 2
                }, 
            ]
            mapUrl: "https://.../e6n/CBC_TOPO_PEI_05.json" (The path leading to the TopoJSON file needed to render the map with D3)
            width: 400 (Default width)
            xCentering: -63.21374728206884  (Longitude at which the projection is centered)
            yCentering: 46.509999863593556  (Lattitude at which the projection is centered)
            rotationConfigurations: {
                x: 0,
                y: 0,
                z: 0,
            }
            projectionModel: "geoTransverseMercator"
            zoomFactor: 0.3 (Minimal zoom level: used on riding click)
            zoomMax: 100 (Maximal zoom level: used on riding click)
        }

    mapDOMContextId: Id of the Map container in E6N page.

    mapId: Id of the map itself.