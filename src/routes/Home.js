import React from "react";
import { useState, useEffect } from "react";
import Movie from "../components/Movie";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const API =
    "https://yts.mx/api/v2/list_movies.json?minimum_rating=6.3&sort_by=download_count";
  const getMovies = async () => {
    const json = await (await fetch(API)).json();
    setMovies(json.data.movies);
    setLoading(false);
    console.dir(json.data.movies);
  };
  useEffect(() => {
    getMovies().catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>movie</h1>
      <hr />
      {loading ? (
        "Loading..."
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              poster={movie.medium_cover_image}
              title={movie.title}
              synopsis={movie.synopsis}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
