import React, { useEffect, useState } from "react";
import GoogleMap from "./components/GoogleMap";
import routing from "./utils/route";
import allLines from "./utils/allLines.json";

function App() {
	const [center, setCenter] = useState({
		lat: 59.95,
		lng: 30.33,
		userLocation: false
	});
	const [stops, setStops] = useState([]);
	const [origin, setOrigin] = useState("");
	const [destination, setDestination] = useState("");
	const [lineChosen, setLineChosen] = useState("");
	const [keywordSearch, setKeywordSearch] = useState("");
	const [distanceSearch, setDistanceSearch] = useState("");
	const [markers, setMarkers] = useState([]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((location) =>
			setCenter({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
				userLocation: true
			})
		);
	}, []);

	const handleSearch = async () => {
		const chosenStops = routing.getStops(lineChosen, origin, destination);
		setStops(chosenStops);
		let results = [];
		const allData = await stops.map(async (stop) => {
			return routing
				.searchPlaces(
					keywordSearch,
					distanceSearch,
					stop.coordinates[1],
					stop.coordinates[0]
				)
				.then((res) => res.data.results)
				.catch((err) => console.log(err));
		});
		Promise.all(allData).then((values) => {
			values.forEach((value) => {
				const objects = value.map((obj) => ({
					name: obj.name,
					placeId: obj.place_id,
					coordinates: [obj.geometry.location.lng, obj.geometry.location.lat],
					type: "result"
				}));

				const filteredObjects = objects.filter(
					(item) => item.name && item.coordinates[0] && item.coordinates[1]
				);
				results.push(...filteredObjects);
			});
			setMarkers(results);
		});
	};

	return (
		<div>
			<div style={{ display: "flex", justifyContent: "space-around" }}>
				<select
					onChange={(e) =>
						setLineChosen(e.target.value.slice(0, 1).toLowerCase())
					}>
					{allLines.map((line) => (
						<option key={Math.floor(Math.random() * 100000)} value={line}>
							{line}
						</option>
					))}
				</select>
				{lineChosen.length ? (
					<>
						<div style={{ display: "flex" }}>
							<h2>Origin</h2>
							<select
								onChange={(e) => setOrigin(e.target.value)}
								value={origin}>
								<option value=''>Select</option>
								{routing.getLine(lineChosen).map((station) => (
									<option
										key={Math.floor(Math.random() * 100000)}
										value={station.name}>
										{station.name}
									</option>
								))}
							</select>
						</div>
						<div style={{ display: "flex" }}>
							<h2>Destination</h2>
							<select
								onChange={(e) => setDestination(e.target.value)}
								value={destination}>
								<option value=''>Select</option>
								{require(`./utils/${lineChosen}Line.json`).map((station) => (
									<option
										key={Math.floor(Math.random() * 100000)}
										value={station.name}>
										{station.name}
									</option>
								))}
							</select>
						</div>
						<button onClick={(e) => handleSearch()}>search</button>
					</>
				) : null}
			</div>
			{origin && destination ? (
				<div style={{ display: "flex" }}>
					<h2>Search For</h2>
					<select
						onChange={(e) => setKeywordSearch(e.target.value)}
						value={keywordSearch}>
						<option>Select</option>
						<option value='gas_station'>Gas Station</option>
						<option value='atm'>ATM</option>
						<option value='supermarket'>Grocery Store</option>
						<option value='convenience_store'>Convenience Store</option>
						<option value='drugstore'>Drugstore</option>
						<option value='restaurant'>Restaurant</option>
						<option value='meal_takeaway'>Takeout</option>
						<option value='bar'>Bar</option>
						<option value='cafe'>Cafe</option>
						<option value='liquor_store'>Liquor Store</option>
						<option value='park'>Park</option>
					</select>
					<h2>Within</h2>
					<select
						onChange={(e) =>
							setDistanceSearch(Math.floor(parseInt(e.target.value) * 80.4672))
						}>
						<option>Select</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
						<option value={6}>6</option>
						<option value={7}>7</option>
						<option value={8}>8</option>
						<option value={9}>9</option>
						<option value={10}>10</option>
						<option value={11}>11</option>
						<option value={12}>12</option>
						<option value={13}>13</option>
						<option value={14}>14</option>
						<option value={15}>15</option>
					</select>
					<p>blocks</p>
				</div>
			) : null}
			<div>
				{center.userLocation ? (
					<GoogleMap
						center={center}
						zoom={12}
						markers={[...markers, ...stops]}
					/>
				) : null}
			</div>
		</div>
	);
}

export default App;
