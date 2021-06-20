import React from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const GoogleMap = (props) => {
	return (
		// Important! Always set the container height explicitly
		<div style={{ height: "90vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
				defaultCenter={props.center}
				defaultZoom={props.zoom}>
				<LocationOnIcon lat={props.center.lat} lng={props.center.lng} />
				{props.markers.map((marker) => (
					<LocationOnIcon lat={marker.lat} lng={marker.lng} />
				))}
			</GoogleMapReact>
		</div>
	);
};

export default GoogleMap;
