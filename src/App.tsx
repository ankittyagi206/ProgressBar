import { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [value, setValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    let timerId = 0;
    if (value < 100) {
      clearInterval(timerId);
      timerId = setInterval(() => {
        setValue((value) => value + 0.1);
      }, 10);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [value]);
  return (
    <div className="container">
      <h1>Progress Bar</h1>
      <ProgressBar value={value} onComplete={() => setIsComplete(true)} />
      {isComplete ? "Conpleted" : "Loading..."}
    </div>
  );
}

export default App;
