import data from './test-data';
import uniqueId from 'lodash.uniqueid';

export const fetchLayers = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 100);
  });
}

export const updateLayer = (layer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
}

export const addLayer = (layer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(uniqueId(1));
    }, 100);
  });
}

export const removeLayer = (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
}
