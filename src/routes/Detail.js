import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState();
  const API = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
  //console.log(id) // movie id(String)
  const getMovieInfo = async () => {
    const json = await (await fetch(API)).json();
    setInfo(json.data);
    setLoading(false);
  };
  useEffect(() => {
    getMovieInfo().catch((error) => console.log(error));
  }, []);
  console.log(info);

  //코드챌린지 
  // nav bar에 home버튼 추가
  // 
  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
            <img alt={`${info.movie.title}`}  src={`${info.movie.background_image}`}></img>
          <h1>
            {info.movie.title}({info.movie.year})
          </h1>
          
          <strong>★ {info.movie.rating} / 10</strong>
          <h3>runtime: {info.movie.runtime} min</h3>
          <b>{info.movie.genres.map(genre=> genre + '  ')}</b>
          <p>{info.movie.description_intro}</p>
        </div>
      )}
    </div>
  );
};

export default Detail;
