import React, { useEffect, useState } from "react";
import GoogleMap from "./components/GoogleMap";

function App() {
	const [center, setCenter] = useState({
		lat: 59.95,
		lng: 30.33,
		userLocation: false
	});
	const [markers, setMarkers] = useState([{ lat: 39.68725, lng: -104.95716 }]);

	useEffect(
		() =>
			navigator.geolocation.getCurrentPosition((location) =>
				setCenter({
					lat: location.coords.latitude,
					lng: location.coords.longitude,
					userLocation: true
				})
			),
		[]
	);

	return (
		<div>
			{center.userLocation ? (
				<GoogleMap center={center} zoom={12} markers={markers} />
			) : null}
		</div>
	);
}

export default App;
