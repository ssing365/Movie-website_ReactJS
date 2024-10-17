import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Movie = ({ poster, title, synopsis, genres, id }) => {
  return (
    <div>
      <img alt={title} src={poster} />
      <h3>
        <Link to={`./movie/${id}`}>{title}</Link>
      </h3>
      <p>
        synopsis :{" "}
        {synopsis.length > 235 ? `${synopsis.slice(0, 234)}...` : synopsis}
      </p>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

Movie.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;
