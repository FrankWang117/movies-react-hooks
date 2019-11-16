import React from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie'
import Search from "./Search";
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=5abd63d1";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			movies: [],
			errorMessage: null
		}
		this.search = this.search.bind(this);
	}
	search(searchValue) {
		console.log(this)
		this.setState({
			loading: true,
			errorMessage: null
		})
		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=5abd63d1`)
			.then(res => res.json())
			.then(jsonRes => {
				if (jsonRes.Response === "True") {
					this.setState({
						loading: false,
						movies: jsonRes.Search
					})
				} else {
					this.setState({
						loading: false,
						errorMessage: jsonRes.Error
					})
				}
			})
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
				<Search search={this.search} />
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
