import React from 'react';

import './component.css';

export default function Square(props) {
  let ret;
  if (props.value === 'W'){
    ret = <div className="circle-shape-white-stone"/>;
  }
  else if (props.value === 'B')
  {
     ret = <div className="circle-shape-black-stone"/>;
  }
  return (
    <div className="square" onClick={props.onClickCell}>
      {ret}
    </div>
  );
}
