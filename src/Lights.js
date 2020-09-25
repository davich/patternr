import React from 'react';
import './Lights.css';

export default function Lights(props) {
  const click = (i) => {
    return () => props.click(i)
  }
  var lights = []
  for (var i = 1; i < 5; ++i) {
    const klass = (parseInt(props.up) === i) ? "light up" : "light"
    lights.push(<div className={klass} key={i} onClick={click(i)}>{i}</div>);
  }

  return (
    <div className="Lights">
      {lights}
    </div>
  )
}
