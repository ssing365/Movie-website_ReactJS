import React from "react";
import styles from "./SortSelect.module.css";

import { useSearchParams } from "react-router-dom";

const SortSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortArr = ["download_count", "like_count", "date_added"];
  const sort = searchParams.get("sort") || "download_count";

  const sortChange = (event) => {
    setSearchParams({ sort: event.target.value, page: 1 });
  };

  return (
    <div>
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
