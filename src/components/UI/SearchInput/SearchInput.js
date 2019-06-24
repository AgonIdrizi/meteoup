import React, { useState } from 'react';
import { Input } from 'antd';




const Search = (props) => {
    const [value, setValue] = useState(
        ''
      );
       
    const Search = Input.Search;

    const handleSubmit = (e) =>{
        console.log(value)
        
         props.searchHandler(value)
         //setValue('')
     }

    return(
        <Search placeholder="Search Location"  value={value} onClick={props.click} onSearch={handleSubmit}  onChange={event => setValue(event.target.value)} />
    )
}

export default Search
  
  
