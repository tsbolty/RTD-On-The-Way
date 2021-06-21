import React, { useEffect, useState } from "react";
import GoogleMap from "./components/GoogleMap";
import axios from "axios";

function App() {
	const [center, setCenter] = useState({
		lat: 59.95,
		lng: 30.33,
		userLocation: false
	});
	const [origin, setOrigin] = useState({
		lat: 0,
		lng: 0
	});
	const [destination, setDestination] = useState({
		lat: 0,
		lng: 0
	});

	const getDirections = async (start, end) => {
		try {
			console.log(start, end);
			const res = await axios.get(
				`https://young-caverns-69277.herokuapp.com/api/maps/directions/${start}/${end}/${process.env.REACT_APP_GOOGLE_API_KEY}`
			);
			console.log(res);
			if (res.data.status !== "ZERO_RESULTS") {
				setOrigin({
					lat: res.data.routes[0].legs[0].start_location.lat,
					lng: res.data.routes[0].legs[0].start_location.lng
				});
				setDestination({
					lat: res.data.routes[0].legs[0].end_location.lat,
					lng: res.data.routes[0].legs[0].end_location.lng
				});
			} else {
				console.log("no results found");
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((location) =>
			setCenter({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
				userLocation: true
			})
		);
		getDirections("Colorado+Station+Denver,+CO", "Union+Station+Denver,+CO");
	}, []);

	return (
		<div>
			{center.userLocation ? (
				<GoogleMap
					center={center}
					zoom={12}
					origin={origin}
					destination={destination}
				/>
			) : null}
		</div>
	);
}

export default App;
