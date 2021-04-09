import React, { Component } from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../utils';

class Map extends Component {
  render() {
      console.log("This is mapCenter", this.props.center);
      const { countries, casesType, center, zoom, ...index } = this.props;
    return (
    
      <div className="map">
        <LeafletMap center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {showDataOnMap(countries, index, casesType)}
        </LeafletMap>
      </div>
    );
  }
}

export default Map;
