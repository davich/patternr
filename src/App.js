import React, { useReducer, useRef, useEffect } from "react";
import Lights from "./Lights.js";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "start":
      const patt = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
      return { ...state, pattern: patt, patternToPlay: patt, gameState: "play" };
    case "replay":
      return { ...state, patternToPlay: state.pattern, gameState: "play" };
    case "lightClick":
      const newPattern = [...state.incomingPattern, action.number];
      if (newPattern.slice(state.pattern.length * -1).join() === state.pattern.join()) {
        return { ...state, incomingPattern: newPattern, gameState: "win" };
      }
      return { ...state, incomingPattern: newPattern };
    case "playPattern":
      if (state.patternToPlay.length > 0) {
        return {
          ...state,
          light: state.patternToPlay[0],
          patternToPlay: state.patternToPlay.slice(1),
        };
      } else {
        clearTimeout(action.timeout);
        return { ...state, light: null, gameState: "listen" };
      }
    default:
      return state;
  }
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App() {
  const initialState = {
    gameState: "play",
    pattern: [321],
    patternToPlay: [],
    incomingPattern: [],
    light: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const start = () => {
    setTimeout(() => tick(), 1000);
    dispatch({ type: "start" });
  };

  const replay = () => {
    setTimeout(() => tick(), 1000);
    dispatch({ type: "replay" });
  };

  const tick = () => {
    var timeout = setTimeout(() => tick(), 1000);
    dispatch({ type: "playPattern", timeout: timeout });
  };

  const prevGameState = usePrevious(state.gameState);

  useEffect(() => {
    if (prevGameState !== "win" && state.gameState === "win") {
      alert("You Win");
    }
  });

  return (
    <div className="App">
      <Lights
        up={state.light}
        gameState={state.gameState}
        click={(i) => {
          dispatch({ type: "lightClick", number: i });
        }}
      ></Lights>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => replay()}>Replay</button>
    </div>
  );
}

export default App;
