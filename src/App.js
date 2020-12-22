import React, { useEffect, useState } from 'react';
import './App.css';
import gtfs from 'gtfs-stream';
import request from 'request';
import { Stream } from "react-streams"

function App() {
  const [state, setState] = useState()
  let coords;
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://www.rtd-denver.com/files/gtfs/google_transit.zip';

    request.get(proxyUrl + url) // or any other way of getting the data stream
    .pipe(gtfs.enhanced())
    .on('data', (entity) => {
      if(entity.data.trip_id == 113631947){
        // console.log(entity)
        coords = entity.data.path.coordinates[entity.data.path.coordinates.length - 1]
        setState(coords)
        // entity.data.path.coordinates.map(item =>{
        //   console.log(`latitude: ${item[1]} 
        //   longitude: ${item[0]}`)
        // })
      }
    })
  
    useEffect(()=>{
      setState(coords)
    }, [coords])
    
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
