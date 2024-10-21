import React from "react";
import styles from "./Pager.module.css";
import { useSearchParams } from "react-router-dom";

const Pager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "download_count";
  const nextClick = () => {
    setSearchParams({ sort, page: page + 1 });
  };
  const prevClick = () => {
    setSearchParams({ sort, page: page - 1 });
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
