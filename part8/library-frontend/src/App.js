import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { Notify } from './components/Notify';
import { LoginForm } from './components/LoginForm';
import { ALL_AUTHORS, ALL_BOOKS } from './queries/queries';
import { useApolloClient, useQuery } from '@apollo/client';
import { Recommend } from './components/Recommend';

const App = () => {
	const [page, setPage] = useState('authors');
	const [token, setToken] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const authors = useQuery(ALL_AUTHORS);
	const books = useQuery(ALL_BOOKS);
	const client = useApolloClient();

	if (authors.loading) {
		return <div>loading...</div>;
	}

	if (books.loading) {
		return <div>loading...</div>;
	}

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	return (
		<>
			<div>
				<Notify errorMessage={errorMessage} />
				<div>
					<button onClick={() => setPage('authors')}>authors</button>
					<button onClick={() => setPage('books')}>books</button>
					{token ? (
						<>
							<button onClick={() => setPage('add')}>add book</button>
							<button onClick={() => setPage('recommended')}>
								recommended
							</button>
							<button onClick={logout}>Logout</button>
						</>
					) : (
						<button onClick={() => setPage('login')}>login</button>
					)}
				</div>
				{token && page === 'login' ? setPage('authors') : null}
				<Authors
					show={page === 'authors'}
					allAuthors={authors.data.allAuthors}
					setError={notify}
				/>

				<Books show={page === 'books'} />

				<NewBook show={page === 'add'} />

				<Recommend show={page === 'recommended'} />

				<LoginForm show={page === 'login'} setToken={setToken} />
			</div>
		</>
	);
};

export default App;
