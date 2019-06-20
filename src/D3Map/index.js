const React = require('react');
const Component = require('react');
const stylingConstants = require('../lib/styled/stylingpackage');
const classNames = require('classnames/dedupe');
const D3MapRenderer = require('../D3MapRenderer');
const D3MapZoomButton = require('../D3MapZoomButton');

class D3Map extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isReady: false,
        currentPan: {
          transformX: 0,
          transformY: 0,
        },
        currentZoom: 1,
      };

      this.minimalZoom = 1;
      this.mediumThreshold = 1024;
  
      this.featuresGlobal = null;
      this.path = null;
      this.projection = null;
      this.svg = null;
      this.zoom = null;
      this.zoomTransform = null;
      this.onMouseMove = this.onMouseMove.bind(this);
      this.fillRidingsWithLeadingPartyColor = this.fillRidingsWithLeadingPartyColor.bind(this);
      this.focusOnRiding = this.focusOnRiding.bind(this);
      this.zoomed = this.zoomed.bind(this);
      this.zoomEnd = this.zoomEnd.bind(this);
      this.zoomToInitialSize = this.zoomToInitialSize.bind(this);
      this.loadMaps = this.loadMaps.bind(this);
      this.GetCornerCoordinates = this.GetCornerCoordinates.bind(this);
      this.getVisibleArea = this.getVisibleArea.bind(this);
  
      this.latestTransform = null;

      this.childTooltipRef = React.createRef();

      const {
        isRidingOpen,
        styledComponents,
      } = this.props;

      const {
        styled,
      } = styledComponents;

      const {
        BREAKPOINTS,
        mediaQueries,
      } = stylingConstants;


      const bp = BREAKPOINTS;
      const { mediaMax } = mediaQueries; 

      this.StyledMap = styled.div` 
      flex-grow: 1;
      position: relative;

      ${mediaQueries.mediaMax(bp.SM.max, `
        height: 45vh;
      `)}

      ${({ isRidingOpen }) => (isRidingOpen ? `
        ${mediaQueries.mediaMax(bp.SM.max, `
          background-image:  linear-gradient(rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.04) 100%);
        `)}
      ` : '')}
    `;

      // TODO: Ajouter le reste du EditMode (les fonctions qui me permettent de get X et Y, ...)
      if (props.isEditMode) {
        window.D3ElectoralMap = window.D3ElectoralMap || {};
        window.D3ElectoralMap[props.mapId] = this;
      }
    }
  
    componentDidMount() {
      const { d3SourceScript } = this.props;

      (async () => {
        if (!window.d3) {
          const tmpFn = window.define;
          window.define = undefined;
          await this.loadScript(d3SourceScript);
          window.define = tmpFn;
        }
        this.setState({ isReady: true });
      })();
    }
  
    componentDidUpdate() {
      if (this.featuresGlobal) {
        // eslint-disable-next-line no-underscore-dangle
        const { childNodes } = this.featuresGlobal._groups[0][0];
  
        for (let i = 0; i < childNodes.length; i += 1) {
          const childNode = childNodes[i];
  
          const partyColor = this.fillRidingsWithLeadingPartyColor(Number.parseInt(childNode.id, 10));
  
          if (partyColor) {
            const attributes = childNode.getAttribute('class');
            childNode.setAttribute('class', classNames(`${partyColor}`, {
              'flash-it': (attributes.indexOf('flash-it') > -1),
            }));
          }
        }
      }
    }
  
    loadScript(src) {
      return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
  
    onMouseMove(event) {
      if (event && event.nativeEvent && this.childTooltipRef && this.childTooltipRef.current) {
        this.childTooltipRef.current.style.left = `${String(event.nativeEvent.layerX + 20)}px`;
        this.childTooltipRef.current.style.top = `${String(event.nativeEvent.layerY + 12)}px`;
      }
    }
   
    fillRidingsWithLeadingPartyColor(featureId) {
      const {
        allRidings,
        e6nHardcodedRidingIdFix,
      } = this.props;
  
      const riding = allRidings ? allRidings[featureId + e6nHardcodedRidingIdFix] : null;
  
      if (riding && riding.leadingPartyId) {
        return `s${riding.leadingPartyId}`;
      }
  
      return null;
    }
  
    focusOnRiding(feature, id) {
      const {
        mapData,
      } = this.props;
  
      const featureId = id;
  
      const featureGroup = window.d3.selectAll('path');
      // eslint-disable-next-line no-underscore-dangle
      for (let k = 0; k < featureGroup._groups[0].length; k += 1) {
        // eslint-disable-next-line no-underscore-dangle
        const node = featureGroup._groups[0][k];
  
        if (node.className.baseVal.indexOf('flash-it') > -1) {
          let currentClasses = node.className.baseVal;
          currentClasses = currentClasses.replace('flash-it', '');
          window.document.getElementById(node.id).className.baseVal = classNames(currentClasses);
        }
  
        const equivalency = Number(node.id);
        if (equivalency === featureId) {
          window.document.getElementById(node.id).className.baseVal += classNames(' flash-it');
        }
      }
  
      const bounds = this.path.bounds(feature);
      const dx = bounds[1][0] - bounds[0][0];
      const dy = bounds[1][1] - bounds[0][1];
      const x = (bounds[0][0] + bounds[1][0]) / 2;
      const y = (bounds[0][1] + bounds[1][1]) / 2;
  
      const scale = Math.max(Math.min(mapData.zoomFactor / Math.max(dx / mapData.width, dy / mapData.height), mapData.zoomMax), 1);
      const mapSearchSection = document.getElementById('search-map');
  
      let widthDifferential;
      for (let m = 0; m < mapData.mapConfigurations.length; m += 1) {
        if ((mapData.mapConfigurations[m].lowerBoundary === 0 ? true : window.innerWidth >= mapData.mapConfigurations[m].lowerBoundary)
        && (mapData.mapConfigurations[m].higherBoundary === 0 ? true : window.innerWidth < mapData.mapConfigurations[m].higherBoundary)) {
          const configWidthDifferential = mapData.mapConfigurations[m].widthDifferential;
          widthDifferential = configWidthDifferential;
          break;
        }
      }
  
      let heightOffset = 1;
      if (window.innerWidth < this.mediumThreshold && document.getElementsByClassName('m-riding-results-card') && document.getElementsByClassName('m-riding-results-card')[0] && document.getElementsByClassName('m-riding-results-card')[0].offsetHeight) {
        heightOffset = document.getElementsByClassName('m-riding-results-card')[0].offsetHeight;
      }
      const translate = [mapSearchSection.clientWidth / widthDifferential - ((scale * x)), mapSearchSection.clientHeight * 0.42 - ((scale * y) + heightOffset / 2)];
  
      this.svg.transition()
        .duration(750)
        .call(this.zoom.transform, window.d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
  
      return true;
    }

    GetCornerCoordinates() {
      if (!this.props.isEditMode) return null;

      if (this.latestTransform) {
        return this.getVisibleArea(this.latestTransform);
      }

      if (this.props.cornersCoordinates) {
        return this.props.cornersCoordinates;
      }
      
      return null;
    }
    
    getVisibleArea(transform) {
      const {
        mapDOMContextId
      } = this.props;

      const currentProjection = this.projection;
      const topLeft = transform.invert([0, 0]);
      const bottomRight = transform.invert([document.getElementById(mapDOMContextId).clientWidth, document.getElementById(mapDOMContextId).clientHeight]);
      const formattedTopLeft = currentProjection.invert([topLeft[0], topLeft[1]]);
      const formattedBottomRight = currentProjection.invert([bottomRight[0], bottomRight[1]]);

      const cornersCoordinates = {
        bottomRight: {
          longitude: formattedBottomRight[0],
          latitude: formattedBottomRight[1],
        },
        topLeft: {
          longitude: formattedTopLeft[0],
          latitude: formattedTopLeft[1],
        }
      };
      return cornersCoordinates;
    }
   
    zoomed() {
      const {
        allowZoom,
      } = this.props;

      if (allowZoom) {
        this.featuresGlobal
          .attr('transform', window.d3.event.transform)
          .selectAll('path').style('stroke-width', `${Math.max(0.01, 1 / (window.d3.event.transform.k * 2))}px`); // updated for d3 v4
      }
    }
  
    zoomToInitialSize() {
      const {
        setCurrentRiding: setCurrentRidingThroughMap,
        E6N_PAGE_IDS
      } = this.props;
      this.svg.transition().duration(750).call(this.zoomTransform, window.d3.zoomIdentity);
      if (setCurrentRidingThroughMap) {
        setCurrentRidingThroughMap(-1, (E6N_PAGE_IDS && E6N_PAGE_IDS.lists ? E6N_PAGE_IDS.lists: null));
      }
    }

    zoomEnd() {
      const { allowZoom } = this.props;
      this.latestTransform = window.d3.event.transform;
      if (!allowZoom) {
        window.d3.event.transform.x = 0;
        window.d3.event.transform.y = 0;
        window.d3.event.transform.k = 1;
      }

      this.featuresGlobal.selectAll('path').style('stroke-width', `${Math.max(0.01, 1 / (window.d3.event.transform.k * 2))}px`);
      
      this.setState({
        currentPan:{
          transformX: window.d3.event.transform.x,
          transformY: window.d3.event.transform.y
        },
        currentZoom: window.d3.event.transform.k
      });
    };
  
    loadMaps(mapDOMId) {
      const {
        cornersCoordinates,
        setCurrentRiding: setCurrentRidingThroughMap,
        mapData,
        mapDOMContextId,
        mapId,
        e6nHardcodedRidingIdFix,
        E6N_PAGE_IDS
      } = this.props;
  
      const mapSearchSection = document.getElementById(mapId);
      let relativeInitialScale = mapSearchSection.clientHeight * mapData.initialProjectionScale;
  
      if (mapData.initialScalingConfigurations) {
        for (let m = 0; m < mapData.initialScalingConfigurations.length; m += 1) {
          if ((mapData.initialScalingConfigurations[m].lowerBoundary === 0 || window.innerWidth >= mapData.initialScalingConfigurations[m].lowerBoundary)
          && (mapData.initialScalingConfigurations[m].higherBoundary === 0 || window.innerWidth < mapData.initialScalingConfigurations[m].higherBoundary)) {
            const baseMeasure = mapData.initialScalingConfigurations[m].shouldUseHeight ? mapSearchSection.clientHeight : mapSearchSection.clientWidth;
            relativeInitialScale = baseMeasure * mapData.initialScalingConfigurations[m].relativeInitialProjectionScale;
            break;
          }
        }
      }
  
      const { rotationConfigurations } = mapData;
      const rotations = {
        x: rotationConfigurations ? rotationConfigurations.x : 0,
        y: rotationConfigurations ? rotationConfigurations.y : 0,
        z: rotationConfigurations ? rotationConfigurations.z : 0,
      };
      const projectionModel = mapData.projectionModel ? mapData.projectionModel : 'geoMercator';
  
      // Map projection
      this.projection = window.d3[projectionModel]()
        .scale(relativeInitialScale)
        .rotate([rotations.x, rotations.y, rotations.z])
        .center([mapData.xCentering, mapData.yCentering]) // projection center
        .translate([mapSearchSection.clientWidth / 2, mapSearchSection.clientHeight / 2]); // translate to center the map in view
  
      if (cornersCoordinates) {
        const cornersAverageLongitude = (cornersCoordinates.topLeft.longitude + cornersCoordinates.bottomRight.longitude) / 2;
        const cornersAverageLattitude = (cornersCoordinates.topLeft.latitude + cornersCoordinates.bottomRight.latitude) / 2;
        const width = document.getElementById(mapDOMContextId).parentNode.offsetWidth;
        const height = document.getElementById(mapDOMContextId).parentNode.offsetHeight;
        const bounds = [this.projection([cornersCoordinates.topLeft.longitude, cornersCoordinates.topLeft.latitude]), this.projection([cornersCoordinates.bottomRight.longitude,cornersCoordinates.bottomRight.latitude])];
        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const x = (bounds[0][0] + bounds[1][0]) / 2;
        const y = (bounds[0][1] + bounds[1][1]) / 2;
        const initialScaleMultiplier = 0.99999 / Math.max(dx / width, dy / height);
        this.projection = window.d3[projectionModel]()
          .scale(relativeInitialScale * initialScaleMultiplier)
          .rotate([rotations.x, rotations.y, rotations.z])
          .center([cornersAverageLongitude, cornersAverageLattitude]) // projection center
          .translate([mapSearchSection.clientWidth / 2, mapSearchSection.clientHeight / 2]); // translate to center the map in view
  
      }
      // Generate paths based on projection
      this.path = window.d3.geoPath()
        .projection(this.projection);
  
      // Create an SVG
      this.svg = window.d3.select(`#${mapDOMId}`)
        .attr('width', '100%')
        .attr('height', '100%');
  
      // Group for the map features
      this.featuresGlobal = this.svg.append('g')
        .attr('class', 'features');

  
      // Create zoom/pan listener
      // Change [1,Infinity] to adjust the min/max zoom scale
      this.zoom = window.d3.zoom()
        .scaleExtent([this.minimalZoom, mapData.zoomMax])
        .on('end', this.zoomEnd)
        .on('zoom', this.zoomed);
  
      this.svg.call(this.zoom);
  
      const assignRidingClass = (data) => `${this.fillRidingsWithLeadingPartyColor(data.properties.EDNumber20)}`;
  
      const handleMouseOver = (d, i) => {
        const {
          setCurrentRidingTooltip: setCurrentRidingTooltipAction,
        } = this.props;
        
        if (setCurrentRidingTooltipAction) {
          const htmlNode = document.getElementsByTagName('html');
          if (window.innerWidth >= this.mediumThreshold && htmlNode && htmlNode[0] && (htmlNode[0].className.indexOf('ipad') < 0 || htmlNode[0].className.indexOf('tablet') < 0)) {
            setCurrentRidingTooltipAction(d.properties.EDNumber20 ? d.properties.EDNumber20 : i + e6nHardcodedRidingIdFix);
          }
        }
      };
  
      const handleMouseOut = () => {
        const {
          setCurrentRidingTooltip: setCurrentRidingTooltipAction,
        } = this.props;
        
        if (setCurrentRidingTooltipAction) {
          const htmlNode = document.getElementsByTagName('html');
          if (window.innerWidth >= this.mediumThreshold && htmlNode && htmlNode[0] && (htmlNode[0].className.indexOf('ipad') < 0 || htmlNode[0].className.indexOf('tablet') < 0)) {
            setCurrentRidingTooltipAction(-1);
          }
        }
      };
  
      // Déplacer ce code dans le componentDidUpdate avec un check sur le mapData.mapUrl changed.
      // ComponentDidMount and DidUpdate should call this.
      window.d3.json(mapData.mapUrl, (error, geodata) => {
        if (error) {
          console.log(error); // unknown error, check the console
          return;
        }
  
        // Create a path for each map feature in the data
        this.featuresGlobal.selectAll('path')
          .data(window.topojson.feature(geodata, geodata.objects.alberta).features) // generate features from TopoJSON
          .enter()
          .append('path')
          .attr('d', this.path)
          .attr('class', assignRidingClass)
          .attr('id', (data) => data.properties.EDNumber20)
          .on('click', (polygon) => {
            if (setCurrentRidingThroughMap) {
              setCurrentRidingThroughMap(polygon.properties.EDNumber20 + e6nHardcodedRidingIdFix, (E6N_PAGE_IDS && E6N_PAGE_IDS.lists ? E6N_PAGE_IDS.lists: null));
            }
          })
          .on('mouseover', handleMouseOver)
          .on('mouseout', handleMouseOut);

        this.zoomTransform = this.zoom.transform;
      });
    }
  
    render() {
      const {
        isReady,
      } = this.state;
  
      const {
        allParties,
        allowClick,
        currentRidingId,
        electionId,
        e6nHardcodedRidingIdFix,
        E6N_PAGE_IDS,
        E6NToolTip,
        forwardMapRef,
        isRidingOpen,
        mapDOMContextId,
        mapId,
        styledComponents,
        ZoomOutButton,
      } = this.props;
  
      if (!isReady) return (null);

      const StyledMap = this.StyledMap;

      if (StyledMap) {
        return (
          <StyledMap
            aria-hidden
            isRidingOpen={isRidingOpen}
            ref={forwardMapRef}
            id={mapId}
          >
            
            {
              E6NToolTip && (
                <E6NToolTip
                  forwardTooltipRef={this.childTooltipRef}
                />
              )
            }
            {
              ZoomOutButton && (
                <D3MapZoomButton
                  ZoomOutButton={ZoomOutButton}
                  onClick={this.zoomToInitialSize}
                  currentPan={this.state.currentPan}
                  currentZoom={this.state.currentZoom}
                  styledComponents={styledComponents}
                  stylingConstants={stylingConstants}
                />
              )
            }
            <D3MapRenderer
              allowClick={allowClick}
              allParties={allParties}
              electionId={electionId}
              currentRidingId={currentRidingId}
              initializeMap={this.loadMaps}
              onMouseMove={(event) => this.onMouseMove(event)}
              focusRiding={this.focusOnRiding}
              e6nHardcodedRidingIdFix={e6nHardcodedRidingIdFix}
              E6N_PAGE_IDS={E6N_PAGE_IDS}
              styledComponents={styledComponents}
              mapDOMContextId={mapDOMContextId}
              stylingConstants={stylingConstants}
            />
          </StyledMap>
        );
      }
      return <div/>
    }
  }

  export default D3Map;
  
  