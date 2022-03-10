import React from 'react';

const Scroll = (props) => {
    console.log(props);

    return (
        <div style={{ overflow: 'scroll', border: '5px solid black', height: '800px'}}>
          {props.children}
        </div>
    );
} 

export default Scroll;
