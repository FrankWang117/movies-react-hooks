import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

function App() {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			// .then(response => response.join())
			.then(jsonResponse => {
				console.log(jsonResponse)
				setMovies(jsonResponse.Search);
				console.log(jsonResponse.Search)
				setLoading(false);
			});
	}, []);

	return (
		<div className="App">
			<Header text="Movie app" />
			<div className="movies">
				{loading && !errorMessage ? (<span>loading...</span>) :
					errorMessage ? (<div className="errorMessage">{errorMessage}</div>) :
						(movies.map((movie, index) => (
							<Movie key={`${index}-${movie.Title}`} movie={movie} />
						)))}
			</div>
			{/* <Movie /> */}
		</div>
	);
}

export default App;
