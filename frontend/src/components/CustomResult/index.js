import { useQueries } from "@tanstack/react-query";
import React from "react";
import { fetchDomain } from "../../services";
import CustomLoading from "../CustomLoading";

const CustomResult = ({ domains }) => {
  const response = useQueries({
    queries: [...new Set(domains)].map((domain) => {
      return {
        queryKey: ["getDomain", domain],
        queryFn: () => fetchDomain(domain),
        enabled: !!domain,
        cacheTime: 86400000,
        staleTime: 86400000
      };
    })
  });

  const isError = response?.some((domain) => domain?.isError);
  const isLoading = response?.some((domain) => domain?.isLoading )

  return (
    <div className="result">
      <CustomLoading isLoading={isLoading} />
      <h3>Results</h3>
      <ol className="result_list">
        {!response?.length && <p>please type any domain name</p>}
        {isError && <p>Something went wrong, please try again later</p>}
        {!isError && !isLoading &&
          response.map(({ data }, i) => {
            return (
              <li
                key={i}
                className={
                  data?.rank < 100 ? "result_item yellow" : "result_item"
                }
              >
                {data?.domain}
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default CustomResult;
