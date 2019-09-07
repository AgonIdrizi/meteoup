import React, { useState } from "react";
import { Input } from "antd";
import { withRouter } from "react-router-dom";

const Search = props => {
  const [value, setValue] = useState("");

  const Search = Input.Search;

  const handleSubmit = e => {
    console.log(value);
    console.log(props.history);
    props.searchHandler(value);
  };
  const size = props.isMobile === true ? "large" : "default";
  return (
    <Search
      size={size}
      placeholder="Search Location"
      value={value}
      onClick={() => props.click(props.history)}
      onSearch={handleSubmit}
      onChange={event => setValue(event.target.value)}
    />
  );
};

export default withRouter(Search);
