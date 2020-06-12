const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

export const intersectGenre = genres => {
	const availableGenres = [
		"action",
		"adventure",
		"comedy",
		"crime",
		"thriller",
		"war",
		"documentary",
		"mystery",
		"drama",
		"horror",
		"scifi",
		"animation"
	];

	return availableGenres.filter(
		el => genres.indexOf(capitalizeFirstLetter(el)) > -1
	);
};

export const getYtVideoId = url => {
	const list = url.split("/");
	return list[list.length - 1];
};

export const slugifySearchterm = searchterm => {
	return searchterm
		.split("")
		.map(ch => (ch === " " ? "-" : ch))
		.join("")
		.toLowerCase();
};

export const getYear = year => new Date(year).getFullYear();

export const pickRandomGenre = genres =>
	genres[Math.floor(Math.random() * genres.length)];
