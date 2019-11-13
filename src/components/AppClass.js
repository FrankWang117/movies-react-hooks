import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=5abd63d1";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			movies: [],
			errorMessage: null
		}
	}
	componentDidMount() {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				this.setState({
					movies: jsonResponse.Search,
					loading: false
				})
			});
	}
	render() {
		return (
			<div className="App" >
				<Header text="Movie App" />
				<div className="movies">
					{this.state.loading && !this.state.errorMessage ?
						(<span>loading</span>) :
						this.state.errorMessage ?
							(<div className="errorMessage">
								{this.state.errorMessage}
							</div>) : (this.state.movies.map((movie, index) => (
								<Movie key={`${index}-${movie.Title}`}
									movie={movie} />
							)))}
				</div>
			</div>
		)
	}

}
export default App;
