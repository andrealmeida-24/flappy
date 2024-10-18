import { useRef } from "react";
import "./App.css";
import { PhaserGame, type IRefPhaserGame } from "./game";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} />
    </div>
  );
}

export default App;
