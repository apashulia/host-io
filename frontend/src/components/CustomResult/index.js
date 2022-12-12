import React from "react";

const CustomResult = ({ domains }) => {
  return (
    <div className="result">
      <h3>Results</h3>
      <ol className="result_list">
        {!domains.length ? (
          <p>please type any domain name</p>
        ) : (
          domains.map(({ value }, i) => {
            return (
              <li
                key={i}
                className={
                  value.rank < 100 ? "result_item yellow" : "result_item"
                }>
                {value.domain}
              </li>
            );
          })
        )}
      </ol>
    </div>
  );
};

export default CustomResult;
