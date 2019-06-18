import React from 'react';
import { Input } from 'antd';




const search = () => {
    const Search = Input.Search;
    return(
        <Search placeholder="input search text"  onSearch={value => console.log(value)} />
    )
}

export default search
  
  
