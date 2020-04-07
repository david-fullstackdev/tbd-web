import React, { Component } from 'react';
import 'leaflet';
import { mapboxConfig } from 'config.js';
import { customIconMarkers } from '../config';
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

    customIconMarkers.map(singleMarker => {
      var customIcon = L.icon({
        iconUrl: singleMarker.iconUrl,
        shadowUrl: singleMarker.shadowUrl,
        iconSize: [40, 40], // size of the icon
        shadowSize: [40, 40], // size of the shadow
        // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 20], // the same for the shadow
        popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
      });
      return L.marker(singleMarker.position, { icon: customIcon })
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
