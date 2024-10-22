import React from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Pager.module.css";

const Pager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "download_count";
  const rate = searchParams.get("minimum_rating") || 7;

  const nextClick = () => {
    setSearchParams({ sort, page: page + 1 , minimum_rating:rate});
  };
  const prevClick = () => {
    setSearchParams({ sort, page: page - 1, minimum_rating:rate });
  };
  return (
    <div>
      <button
        className={styles.page_btn}
        onClick={prevClick}
        disabled={page === 1 ? true : false}
      >
        {"<"}
      </button>
      <span> {page} </span>
      <button className={styles.page_btn} onClick={nextClick} disabled={false}>
        {">"}
      </button>
    </div>
  );
};

export default Pager;
