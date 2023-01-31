import React from "react";
import { ReactComponent as LoadingIcon } from "../../assets/icons/loading-icon.svg";

const CustomLoading = ({ isLoading }) => {
  return isLoading ? (
    <span className="loading">
      <LoadingIcon />
    </span>
  ) : null;
};

export default CustomLoading;
