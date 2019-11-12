import React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {
	// const poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

	return (
		<div className="movie">
			{/* <h2>{movie.Title}</h2> */}
			<h2>银翼杀手</h2>

			<div>
				{/* <img width="200" alt={`The movie titled: ${movie.Title}`}
					src={DEFAULT_PLACEHOLDER_IMAGE} /> */}
				<img width="200" alt={`The movie titled: 银翼杀手`}
					src={DEFAULT_PLACEHOLDER_IMAGE} />
			</div>
			{/* <p>({movie.Year})</p> */}
			<p>2019-10-10</p>

		</div>
	);
};

export default Movie;