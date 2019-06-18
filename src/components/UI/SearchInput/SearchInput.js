import React from 'react';
import { Input } from 'antd';




const search = (props) => {
    const Search = Input.Search;
    return(
        <Search placeholder="input search text" onClick={props.click}  onSearch={value => console.log(value)} />
    )
}

export default search
  
  
