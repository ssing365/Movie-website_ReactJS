import React from "react";
import styles from "./RateSelect.module.css";
import { useSearchParams } from "react-router-dom";

const RateSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rateArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const sort = searchParams.get("sort") || "download_count";
  const rate = searchParams.get("minimum_rating") || 7;

  const rateChange = (event) => {
    setSearchParams({
      sort: sort,
      page: 1,
      minimum_rating: event.target.value,
    });
  };

  return (
    <div className={styles.rate_select}>
      <span className={styles.rate_span}>Minimum_rating</span>
      <select className={styles.rate_option} value={rate} onChange={rateChange}>
        {rateArr.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
    </div>
  );
};

export default RateSelect;
