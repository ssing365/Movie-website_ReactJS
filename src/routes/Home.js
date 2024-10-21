import React from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Movie from "../components/Movie";
import SortSelect from "../components/SortSelect";
import Pager from "../components/Pager";
import styles from "./Home.module.css";
import RateSelect from "../components/RateSelect";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  // 쿼리 파라미터에서 불러오기
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "download_count";
  const rate = searchParams.get("minimum_rating") || 7;

  const API = `https://yts.mx/api/v2/list_movies.json
    ?minimum_rating=${rate}&limit=8&page=${page}&sort_by=${sort}`;
  const getMovies = async () => {
    const json = await (await fetch(API)).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies().catch((error) => console.log(error));
  }, [page, sort, rate]);

  return (
    <div>
      <h1 className={styles.titleName}>
        <Link to={`/`} className={styles.titleName} style={{}}>
          The Movies
        </Link>
      </h1>
      <hr />
      <br />
      <div className={styles.selection}>
        <RateSelect />
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
