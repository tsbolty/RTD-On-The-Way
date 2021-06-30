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
				{props.markers.map((marker) => (
					<div lat={marker.coordinates[1]} lng={marker.coordinates[0]}>
						{marker.type === "result" ? (
							<a
								href={`https://www.google.com/maps/place/?q=place_id:${marker.placeId}`}
								target='_blank'
								rel='noreferrer'>
								<LocationOnIcon color='primary' />
							</a>
						) : (
							<LocationOnIcon color='secondary' />
						)}
					</div>
				))}
			</GoogleMapReact>
		</div>
	);
};

export default GoogleMap;
