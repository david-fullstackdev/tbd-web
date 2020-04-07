import React, { Component } from 'react';
import 'leaflet';
import { mapboxConfig } from 'config.js';
import { customHtmlMarker } from '../config';
import LeafletMapWrapper from './map.style';

class LMap extends Component {
  constructor(props) {
    super(props);
    this.mountMap = this.mountMap.bind(this);
  }
  mountMap(element) {
    if (!element) return;
    const { L } = window;
    const map = L.map(element).setView(
      mapboxConfig.center,
      !isNaN(mapboxConfig.defaultZoom) ? mapboxConfig.defaultZoom : 13
    );
    L.tileLayer(mapboxConfig.tileLayer, {
      maxZoom: !isNaN(mapboxConfig.maxZoom) ? mapboxConfig.maxZoom : 18,
      id: mapboxConfig.id,
      accessToken: mapboxConfig.accessToken,
    }).addTo(map);

    customHtmlMarker.map(singleMarker => {
      const htmlIcon = L.divIcon({
        className: singleMarker.className,
        popupAnchor: [15, -15], // point from which the popup should open relative to the iconAnchor
        html: singleMarker.html,
      });
      return L.marker(singleMarker.position, { icon: htmlIcon })
        .addTo(map)
        .bindPopup(singleMarker.popupText);
    });
  }
  render() {
    return (
      <LeafletMapWrapper className="isoLeafletMap">
        <div
          id="basic-map-marker"
          style={{ height: '400px', width: '100%' }}
          ref={this.mountMap}
        />
      </LeafletMapWrapper>
    );
  }
}

export default LMap;
