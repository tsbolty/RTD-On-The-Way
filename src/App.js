import React, { useState } from 'react';
import './App.css';
import gtfs from 'gtfs-stream';
import request from 'request';

function App() {
  const [state, setState] = useState()
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://www.rtd-denver.com/files/gtfs/google_transit.zip';

  request.get(proxyUrl + url)
    .pipe(gtfs.enhanced())
    .on('data', (entity) => {
      if (entity.data.trip_id == 113631947) {
        // console.log(entity)
        setState(entity.data.path.coordinates[entity.data.path.coordinates.length - 1])
        // entity.data.path.coordinates.map(item =>{
        //   console.log(`latitude: ${item[1]} 
        //   longitude: ${item[0]}`)
        // })
      }
    })

  return (
    <div className="App">
      {state &&
        <>
          <h5>Latitude: {state[1]}</h5>
          <h5>Longitude: {state[0]}</h5>
        </>}
    </div>
  );
}

export default App;
