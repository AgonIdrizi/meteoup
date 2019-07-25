import React from 'react';
import { Button } from 'antd'
const Logout = (props) => {
    return(<div>
            <p>Logout</p>
            <Button onClick={ props.logoutHandler }>Sign Out</Button>
          </div>)
}

export default Logout