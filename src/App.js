import React, { useEffect, useState } from "react";
import GoogleMap from "./components/GoogleMap";
import routing from "./utils/route";
import Search from "./components/Search";

function App() {
	const [state, setState] = useState({
		center: {
			lat: 39.724888799404596,
			lng: -104.99608392483549,
			userLocation: false
		},
		stops: [],
		markers: [],
		origin: "",
		destination: "",
		lineChosen: "",
		keywordSearch: "",
		distanceSearch: ""
	});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((location) =>
			setState({
				...state,
				center: {
					lat: location.coords.latitude,
					lng: location.coords.longitude,
					userLocation: true
				}
			})
		);
	}, []);

	useEffect(() => {
		setState({ ...state, origin: "", destination: "" });
	}, [state.lineChosen]);

	const handleSearch = async () => {
		const chosenStops = routing.getStops(
			state.lineChosen,
			state.origin,
			state.destination
		);
		let results = [];
		const allData = await chosenStops.map(async (stop) => {
			return routing
				.searchPlaces(
					state.keywordSearch,
					state.distanceSearch,
					stop.coordinates[1],
					stop.coordinates[0]
				)
				.then((res) => res.data.results)
				.catch((err) => console.log(err));
		});
		Promise.all(allData).then((values) => {
			console.log(values);
			// if (values.every((value) => !Object.entries(value).length)) {
			// 	console.log("No results found");
			// 	return;
			// }
			values.forEach((value) => {
				console.log(value);
				const objects =
					(value &&
						value.map((obj) => ({
							name: obj.name,
							placeId: obj.place_id,
							coordinates: [
								obj.geometry.location.lng,
								obj.geometry.location.lat
							],
							address: obj.vicinity,
							type: "result"
						}))) ||
					[];

				results.push(...objects);
			});
			setState({ ...state, markers: results, stops: chosenStops });
		});
	};

	return (
		<div>
			<Search state={state} setState={setState} handleSearch={handleSearch} />
			<div>
				{state.center.userLocation ? (
					<GoogleMap
						center={state.center}
						zoom={12}
						markers={[...state.markers, ...state.stops]}
					/>
				) : null}
			</div>
		</div>
	);
}

export default App;
