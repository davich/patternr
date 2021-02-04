import React from "react";
import "./Lights.css";

interface LightProps {
  click: (i: number) => void;
  up: number | null;
  gameState: string;
}

export default function Lights(props: LightProps) {
  var lights: JSX.Element[] = [];
  for (var i = 1; i < 5; ++i) {
    const klass = props.up === i ? "light up" : "light";
    const lightDiv = <div className={klass} key={i} onClick={props.click.bind(null, i)}></div>;
    lights.push(lightDiv);
  }

  return <div className="Lights">{lights}</div>;
}
