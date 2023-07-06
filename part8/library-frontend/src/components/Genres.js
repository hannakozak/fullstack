import { useState } from 'react';

export const Genres = ({ books }) => {
	const [genre, setGenre] = useState();
	const genresArray = books.map((book) => book.genres);
	const uniqGenres = [...new Set(genresArray.flat())];

	const handleClick = (event) => {
		setGenre(event.target.value);
		console.log(genre);
	};
	return (
		<>
			{uniqGenres.map((genre) => (
				<button key={genre} value={genre} onClick={handleClick}>
					{genre}
				</button>
			))}
		</>
	);
};
