import React, { useReducer, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
const MOVIE_API_URL = "https://www.omdbapi.com/?s=jackie&apikey=5abd63d1";
const initialState = {
	loading: true,
	movies: [],
	errorMessage: null
}
function reducer(state, action) {
	switch (action.type) {
		case 'requesting':
			return {
				...state,
				loading: true
			};
		case 'query_success':
			return {
				...state,
				loading: false,
				movies: action.movies
			};
		case 'query_error':
			return {
				...state,
				loading: false,
				errorMessage: action.error
			};
		default:
			return state;
	}
}
function App() {

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				dispatch({
					type: "query_success",
					movies: jsonResponse.Search
				})
			});
	}, []);

	const search = searchValue => {
		dispatch({
			type: "requesting"
		})
		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=5abd63d1`)
			.then(res => res.json())
			.then(jsonRes => {
				if (jsonRes.Response === "True") {
					dispatch({
						type: "query_success",
						movies: jsonRes.Search
					})
				} else {
					dispatch({
						type: "query_error",
						error: jsonRes.Error
					})
				}
			})
	}
	const { movies, loading, errorMessage } = state;
	return (
		<div className="App">
			<Header text="Movie App" />
			<Search search={search} />
			<p className="App-intro">分享快乐,从电影开始</p>
			<div className="movies">
				{loading && !errorMessage ? (<span>loading...</span>) :
					errorMessage ? (<div className="errorMessage">{errorMessage}</div>) :
						(movies.map((movie, index) => (
							<Movie key={`${index}-${movie.Title}`} movie={movie} />
						)))}
			</div>
		</div>
	);
}

export default App;
