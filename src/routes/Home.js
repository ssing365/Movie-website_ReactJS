import React from "react";
import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

const Home = () => {
  const sortArr = ['download_count', 'like_count', 'date_added']
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('download_count')
  const sortChange = (event) => {
    console.log(event.target.value)
    setSort(event.target.value)
  }
  const nextClick = () => {
    setPage(current => current + 1)
  }
  const prevClick = () => {
    setPage(current => current - 1)
  }
  const API =
    `https://yts.mx/api/v2/list_movies.json
    ?minimum_rating=6.3
    &limit=6&page=${page}&sort_by=${sort}`;
  const getMovies = async () => {
    const json = await (await fetch(API)).json();
    setMovies(json.data.movies);
    setLoading(false);
    console.dir(json.data.movies);
  };
  useEffect(() => {
    getMovies().catch((error) => console.log(error));
  }, [page, sort]);

  return (
    <div>
      <h1 className={styles.titleName}>The Movies</h1>
      <hr />
      <br />
      <div className={styles.sort_select}>
        <span className={styles.sort_span}>Sort by</span>
        <select className={styles.sort_option} onChange={sortChange}>
          {sortArr.map((sort) =>
            <option>{sort}</option>
          )}
        </select>
      </div>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.movies}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                year={movie.year}
                summary={movie.synopsis}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.pager}>
        <button className={styles.page_btn} onClick={prevClick} disabled={page === 1 ? true : false}>{'<'}</button>
        <span> {page} </span>
        <button className={styles.page_btn} onClick={nextClick} disabled={false}>{'>'}</button>
      </div>
    </div>
  );
};

export default Home;
