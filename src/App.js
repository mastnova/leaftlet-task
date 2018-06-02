import React, { Component } from 'react';
import update from 'immutability-helper';
import './App.css';
import List from './components/List/List';
import Map from './components/Map/Map';
import * as API from './API';



class App extends Component {
  state = {
    layers: [],
    currentLayer: {},
  }

  componentWillMount() {
    this.fetchLayers();
  }

  fetchLayers = () => {
    const fetchedData = API.fetchLayers();
    fetchedData.then(
      layers => this.setState({ layers, currentLayer: layers[0] }),
      error => console.error(error)
    );
  }

  selectLayer = (id) => () => {
    const currentLayer = this.state.layers.find( layer => layer.id === id);
    this.setState({currentLayer});
  }

  updateLayer = (markers) => {
    const { layers, currentLayer } = this.state;
    if (!currentLayer.id) return;
    const index = layers.findIndex(layer => layer.id === currentLayer.id);
    const updatedLayers = update(layers, { [index]: { markers: {$set: markers } } } );
    API.updateLayer({...currentLayer, markers}).then(
      () => this.setState({
        layers: updatedLayers,
        currentLayer: { ...currentLayer, markers }
      }),
      error => console.error(error)
    );
  }

  addLayer = () => {
    const newLayer = { name: 'new layer', markers: [] };
    API.addLayer(newLayer).then(
      id => this.setState({
        layers: [ ...this.state.layers, { id, ...newLayer } ],
        currentLayer: { id, ...newLayer },
      }),
      error => console.error(error)
    )
  }

  removeLayer = (id) => () => {
    const layers = this.state.layers.filter( layer => layer.id !== id);
    API.removeLayer(id).then(
      () => this.setState({ layers, currentLayer: layers[0] || {}}),
      error => console.error(error)
    );
  }

  renameLayer = id => name => {
    let { currentLayer } = this.state;
    const { layers } = this.state;
    const index = layers.findIndex(layer => layer.id === id);
    const updatedLayers = update(layers, { [index]: { name: { $set: name } } });
    const updatedLayer = updatedLayers.find( layer => layer.id === id);
    if (currentLayer.id === id) {
      currentLayer = updatedLayer;
    }
    API.updateLayer(updatedLayer).then(
      () => this.setState({
        layers: updatedLayers,
        currentLayer,
      }),
      error => console.error(error)
    );
  }

  render() {
    return (
      <div className="App">
        <div className="list-wrapper">
          <button onClick={this.addLayer} className="btn btn-primary btn-lg btn-block">
            New layer
          </button>
          <List
            items={this.state.layers}
            activeItemId={this.state.currentLayer.id}
            selectHandler={this.selectLayer}
            removeHandler={this.removeLayer}
            changeHandler={this.renameLayer}
          />
        </div>
        <Map 
          markers={this.state.currentLayer.markers}
          updateHandler={this.updateLayer}
        />
      </div>
    );
  }
}

export default App;
