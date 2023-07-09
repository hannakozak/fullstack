import { USER, ALL_BOOKS_BY_GENRE } from '../queries/queries';
import { useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

export const Recommend = ({ show }) => {
	const { data: userData, loading: loadingUser } = useQuery(USER);
	const genre = userData?.me?.favoriteGenre;
	const { data: booksData, loading: loadingBooks } = useQuery(
		ALL_BOOKS_BY_GENRE,
		{
			variables: { genre },
		}
	);
	const books = booksData?.allBooks;

	if (!show) {
		return null;
	}

	return (
		<>
			{(loadingUser || loadingBooks) && <p>Loading books...</p>}

			<h1>Recommmendations</h1>
			<h2>Books in your favorite genre {genre}</h2>
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
		</>
	);
};
