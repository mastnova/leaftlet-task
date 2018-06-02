import React, { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class Map extends Component {

  componentDidMount() {
    this.map = L.map('map').setView([51.505, -0.09], 10);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFzdDc0OSIsImEiOiJjamh2eWdzYmkxMHl6M3BuMzQyZHlnN3c3In0.xVILV0eXN3c77l8dzG4gEA', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoibWFzdDc0OSIsImEiOiJjamh2eWdzYmkxMHl6M3BuMzQyZHlnN3c3In0.xVILV0eXN3c77l8dzG4gEA'
    }).addTo(this.map);
    this.markersGroup = L.layerGroup().addTo(this.map);
    
    this.map.on('click', (e) => {
      const coords = [e.latlng.lat, e.latlng.lng];
      const newMarker = this.createMarker(coords).addTo(this.map);
      this.markersGroup.addLayer(newMarker);
    })
    
    const DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    this.drawLayer();
  }

  componentDidUpdate() {
    this.drawLayer();
  }

  drawLayer = () => {
    this.markersGroup && this.markersGroup.remove();
    const markers = this.props.markers.map(coords => this.createMarker(coords));
    this.markersGroup = L.layerGroup(markers);
    this.markersGroup.addTo(this.map);
  }

  createMarker(coords) {
    const self = this;
    return L.marker(coords).on('click', function () { 
      self.markersGroup.removeLayer(this); 
      this.remove() 
    })
  }

  onClickSave = () => {
    const markers = this.markersGroup.toGeoJSON().features;
    const coords = markers.map(marker => [...Object.values(L.GeoJSON.coordsToLatLng(marker.geometry.coordinates))]);
    this.props.updateHandler(coords);
  }

  render() {
    return (
      <div>
        <div id="map"></div>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={this.onClickSave}
        >
          Save changes
        </button>
      </div>
    );
  }
}

Map.defaultProps = {
  markers: [],
}

Map.propTypes = {
  markers: PropTypes.array,
  updateHandler: PropTypes.func.isRequired,
}

export default Map;