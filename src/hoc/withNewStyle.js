import React from 'react';


 const withNewStyle = (WrappedComponent,props)  => {
    
     const style={
         height: '400px'
     }

    return (props) => <WrappedComponent {...props}  />
}

export default withNewStyle;