import { useEffect, useState } from 'react';
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../queries/queries';
import { useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

const Books = ({ show }) => {
	const [genre, setGenre] = useState('');
	const [books, setBooks] = useState();

	const allBooks = useQuery(ALL_BOOKS);
	const showAllBooks = allBooks.data.allBooks;
	const showBooksByGenre = useQuery(ALL_BOOKS_BY_GENRE, {
		variables: { genre },
	});

	const genresArray = showAllBooks.map((book) => book.genres);
	const uniqGenres = [...new Set(genresArray.flat())];

	useEffect(() => {
		if (showBooksByGenre.data) setBooks(showBooksByGenre.data.allBooks);
	}, [genre, showBooksByGenre.data]);

	const showBooks = async (genre) => {
		setGenre(genre);
	};

	if (!show) {
		return null;
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th>name</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={uuidv4()}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
							{a.genres.map((genre) => (
								<td key={uuidv4()}>{genre}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<button onClick={() => setGenre('')}>all</button>
				{uniqGenres.map((genre) => (
					<button key={genre} value={genre} onClick={() => showBooks(genre)}>
						{genre}
					</button>
				))}
			</div>
		</div>
	);
};

export default Books;
