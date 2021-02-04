import React, { useReducer, useRef, useEffect } from "react";
import Lights from "./Lights";
import "./App.css";

interface State {
  gameState: string;
  pattern: number[];
  patternToPlay: number[];
  incomingPattern: number[];
  light: number | null;
}

interface Action {
  type: string;
  number?: number;
  timeout?: number;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "start":
      const patt = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
      return { ...state, pattern: patt, patternToPlay: patt, gameState: "play" };
    case "replay":
      return { ...state, patternToPlay: state.pattern, gameState: "play" };
    case "lightClick":
      if (!action.number) return state;
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

function usePrevious<T>(value: T): T {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as T;
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
    window.setTimeout(() => tick(), 1000);
    dispatch({ type: "start" });
  };

  const replay = () => {
    window.setTimeout(() => tick(), 1000);
    dispatch({ type: "replay" });
  };

  const tick = () => {
    var timeout = window.setTimeout(() => tick(), 1000);
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
      <button onClick={start}>Start</button>
      <button onClick={replay}>Replay</button>
    </div>
  );
}

export default App;
