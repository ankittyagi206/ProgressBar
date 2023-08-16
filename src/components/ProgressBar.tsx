import { useEffect, useState } from "react";
import "../App.css";

const ProgressBar = ({ value = 0, onComplete = () => {} }) => {
  const [percent, setPercent] = useState(value);
  useEffect(() => {
    setPercent(Math.min(100, Math.max(0, value)));
    if (value >= 100) {
      onComplete();
    }
  }, [value, onComplete]);

  return (
    <div className="progressbarContainer">
      <div
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        role="progressbar"
        style={{
          width: "100%",
          backgroundColor: "#00c251",
          height: "100%",
        }}
      ></div>
      <span
        className="progress"
        style={{ color: percent > 49 ? "white" : "black" }}
      >
        {percent.toFixed()}%
      </span>
    </div>
  );
};
export default ProgressBar;
