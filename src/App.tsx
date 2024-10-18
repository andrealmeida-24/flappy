import { useRef } from "react";
import "./App.css";
import { PhaserGame, type IRefPhaserGame } from "./game";
import { useOrientation } from "./hooks";

import { Error } from "./components";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  const orientation = useOrientation();

  return (
    <div id="app">
      {orientation === "landscape" ? <PhaserGame ref={phaserRef} /> : <Error />}
    </div>
  );
}

export default App;
