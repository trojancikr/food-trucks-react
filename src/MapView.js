import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';
import cssClasses from './MapView.module.css';

function MapView({pins = []}) {
  return (
    <div className={cssClasses.map}>
      <GoogleMapReact bootstrapURLKeys={{key: 'AIzaSyBZ6o9ZHo36-AGXMNisdnU9QAXy-4FJG5w'}} defaultCenter={{lat: 37.7749, lng: -122.4194, address: 'Center of San Francisco'}} defaultZoom={14}>
        {pins.map(({id, name, latitude, longitude}) => (
          <LocationPin key={id} name={name} lat={latitude} lng={longitude} />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default MapView;