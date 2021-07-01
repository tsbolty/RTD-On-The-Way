import React from "react";
import GoogleMapReact from "google-map-react";
import LocationModal from "./Modal";

const GoogleMap = (props) => {
	return (
		// Important! Always set the container height explicitly
		<div style={{ height: "90vh", width: "100%" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
				defaultCenter={props.center}
				defaultZoom={props.zoom}>
				{props.markers.map((marker) => (
					<div lat={marker.coordinates[1]} lng={marker.coordinates[0]}>
						<LocationModal
							locationInfo={marker}
							color={marker.type === "result" ? "primary" : "secondary"}
						/>
					</div>
				))}
			</GoogleMapReact>
		</div>
	);
};

export default GoogleMap;
