import React from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Movie from "../components/Movie";
import SortSelect from "../components/SortSelect";
import Pager from "../components/Pager";
import styles from "./Home.module.css";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  // 쿼리 파라미터에서 페이지와 정렬 기준을 불러옴
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "download_count";

  const API = `https://yts.mx/api/v2/list_movies.json
    ?minimum_rating=6.3
    &limit=6&page=${page}&sort_by=${sort}`;
  const getMovies = async () => {
    const json = await (await fetch(API)).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies().catch((error) => console.log(error));
  }, [page, sort]);

  return (
    <div>
      <h1 className={styles.titleName}>
        <Link to={`/`} className={styles.titleName} style={{}}>
          The Movies
        </Link>
      </h1>
      <hr />
      <br />
      <div className={styles.sort_select}>
        <SortSelect />
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
        <Pager />
      </div>
    </div>
  );
};

export default Home;
