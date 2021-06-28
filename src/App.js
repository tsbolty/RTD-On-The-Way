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
	const [destination, setDestination] = useState();
	const [lineChosen, setLineChosen] = useState("");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((location) =>
			setCenter({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
				userLocation: true
			})
		);
	}, []);

	return (
		<div>
			<div style={{ display: "flex", justifyContent: "space-around" }}>
				<select
					onChange={(e) =>
						setLineChosen(e.target.value.slice(0, 1).toLowerCase())
					}>
					{allLines.map((line) => (
						<option value={line}>{line}</option>
					))}
				</select>
				{lineChosen.length ? (
					<>
						<div style={{ display: "flex" }}>
							<h2>Origin</h2>
							<select onChange={(e) => setOrigin(e.target.value)}>
								{routing.getLine(lineChosen).map((station) => (
									<option value={station.name}>{station.name}</option>
								))}
							</select>
						</div>
						<div style={{ display: "flex" }}>
							<h2>Destination</h2>
							<select onChange={(e) => setDestination(e.target.value)}>
								{require(`./utils/${lineChosen}Line.json`).map((station) => (
									<option value={station.name}>{station.name}</option>
								))}
							</select>
						</div>
						<button
							onClick={(e) =>
								setStops(routing.getStops(lineChosen, origin, destination))
							}>
							search
						</button>
					</>
				) : null}
			</div>
			<div>
				{center.userLocation ? (
					<GoogleMap center={center} zoom={12} markers={stops} />
				) : null}
			</div>
		</div>
	);
}

export default App;
