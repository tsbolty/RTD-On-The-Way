const getStops = (line, origin, destination) => {
	const allLineStops = require(`./${line.toLowerCase()}Line.json`);
	const start = allLineStops.map((e) => e.name).indexOf(origin);
	const end = allLineStops.map((e) => e.name).indexOf(destination);
	const indexes = start > end ? [end, start] : [start, end];
	return allLineStops.slice(indexes[0], indexes[1] + 1);
};

const getLine = (line) => {
	return require(`./${line}Line.json`);
};

const methods = { getStops, getLine };

export default methods;
