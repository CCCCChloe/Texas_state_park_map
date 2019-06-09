import React, { useState } from 'react';
import { 
  GoogleMap, 
  withScriptjs, 
  withGoogleMap, 
  Marker, 
  InfoWindow 
} from 'react-google-maps';
import parksData from './data/data.json';
import mapStyle from './mapStyle';

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  var currentday = new Date();
  var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var today = week[currentday.getDay()];

  return (
    <GoogleMap 
      defaultZoom={7} 
      defaultCenter={{ lat: 30.268427, lng: -97.727013 }} 
      defaultOptions={{ styles: mapStyle }}
      onClick={() => {setSelectedPark(null);}}
    >
      {parksData.map(park => (
        <Marker 
          key={park.Park_ID} 
          position={{ lat: park.Latitude, lng: park.Longitude }}
          onClick = {() => { setSelectedPark(park); }} 
          icon = {{
            url: "/icon.png",
            scaledSize: new window.google.maps.Size(25, 33),
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow 
          position={{ lat: selectedPark.Latitude, lng: selectedPark.Longitude }} 
          onCloseClick={() => {setSelectedPark(null);}}
        >
          <div>
            <h2>{ selectedPark.Name }</h2>
            <div>
              <img 
                alt='address icon'
                src='./addressIcon.png' 
                style={{ height: '24px', display: 'inline', position: 'relative', top: '5px' }} 
              />
              <p 
                style={{ 
                  display: 'inline', 
                  paddingLeft: '10px', 
                  }}
              >
                { selectedPark.Address }
              </p>
            </div>
            
            <div >
              <img 
                alt='time icon'
                src='./timeIcon.png' 
                style={{ height: '20px', display: 'inline', margin: '2px 2px', position: 'relative', top: '15px' }} 
              />
              <table style={{marginLeft: '31px', position: 'relative', top: '-10px'}}>
                <tbody>
                  <tr style={{backgroundColor: '#97d99f', borderBottom: 'thick solid red'}}>
                    <td>{today}</td>
                    <td>{ selectedPark.Time[today] }</td>
                  </tr>
                  <tr style={{color: 'grey'}}>
                    <td>Sunday</td>
                    <td>{ selectedPark.Time.Sunday }</td>
                  </tr>
                  <tr style={{color: 'grey'}}>
                    <td>Monday</td>
                    <td>{ selectedPark.Time.Monday }</td>
                  </tr>
                  <tr style={{color: 'grey'}}>
                    <td>Tuesday</td>
                    <td>{ selectedPark.Time.Tuesday }</td>
                  </tr>
                  <tr style={{color: 'grey'}}>
                    <td>Wednesday</td>
                    <td>{ selectedPark.Time.Wednesday }</td>
                  </tr>
                  <tr style={{color: 'grey'}}>
                    <td>Thursday</td>
                    <td>{ selectedPark.Time.Thursday }</td>
                  </tr>
                  <tr style={{color: 'grey'}}>
                    <td>Friday</td>
                    <td>{ selectedPark.Time.Friday }</td>
                  </tr>
                  <tr style={{color: 'grey'}}>
                    <td>Saturday</td>
                    <td>{ selectedPark.Time.Saturday }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <WrappedMap 
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBLUVxQKbhvQSvDVMGrlyTmkLKOIxn5Ws0'} loadingElement={<div style={{ height: '100%' }} />} containerElement={<div style={{ height: '100%' }} />} mapElement={<div style={{ height: '100%' }} />} 
      />
    </div>
  );
}

export default App;
