import React from 'react';

function LengthSetter(props){
    return(
        <div className="lengthSetter">
            <h3>{props.title}</h3>
            <div className="lengthDisplay">{props.length}</div>
            <button onClick={props.plus}>+</button>
            <button onClick={props.minus}>-</button>
        </div>
    );
}

export default LengthSetter;