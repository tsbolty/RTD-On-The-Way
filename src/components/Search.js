import React from "react";
import allLines from "../utils/allLines.json";
import routing from "../utils/route";

function Search({ state, setState, handleSearch }) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-around",
				flexFlow: "wrap"
			}}>
			<select
				onChange={(e) =>
					setState({
						...state,
						lineChosen: e.target.value.slice(0, 1).toLowerCase()
					})
				}>
				{allLines.map((line) => (
					<option key={Math.floor(Math.random() * 100000)} value={line}>
						{line}
					</option>
				))}
			</select>
			{state.lineChosen.length ? (
				<>
					<div style={{ display: "flex" }}>
						<h2>Origin</h2>
						<select
							onChange={(e) => setState({ ...state, origin: e.target.value })}
							value={state.origin}>
							<option value=''>Select</option>
							{routing.getLine(state.lineChosen).map((station) => (
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
							onChange={(e) =>
								setState({ ...state, destination: e.target.value })
							}
							value={state.destination}>
							<option value=''>Select</option>
							{require(`../utils/${state.lineChosen}Line.json`).map(
								(station) => (
									<option
										key={Math.floor(Math.random() * 100000)}
										value={station.name}>
										{station.name}
									</option>
								)
							)}
						</select>
					</div>
				</>
			) : null}
			{state.origin && state.destination ? (
				<div style={{ display: "flex" }}>
					<h2>Search For</h2>
					<select
						onChange={(e) =>
							setState({ ...state, keywordSearch: e.target.value })
						}
						value={state.keywordSearch}>
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
							setState({
								...state,
								distanceSearch: Math.floor(parseInt(e.target.value) * 80.4672)
							})
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
					{state.keywordSearch && state.distanceSearch ? (
						<button onClick={(e) => handleSearch()}>search</button>
					) : null}
				</div>
			) : null}
		</div>
	);
}

export default Search;
