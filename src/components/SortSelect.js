import React from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SortSelect.module.css";

const SortSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortArr = ["download_count", "like_count", "date_added"];
  const sort = searchParams.get("sort") || "download_count";
  const rate = searchParams.get("minimum_rating") || 7;

  const sortChange = (event) => {
    setSearchParams({ sort: event.target.value, page: 1, minimum_rating:rate});
  };

  return (
    <div className={styles.sort_select}>
      <span className={styles.sort_span}>Sort by</span>
      <select className={styles.sort_option} onChange={sortChange} value={sort}>
        {sortArr.map((sortOption) => (
          <option key={sortOption}>{sortOption}</option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;
