import { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import axios from "axios";

function App() {
  const [value, setValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const getImage = () => {
    const options = {
      responseType: "blob",
      onDownloadProgress: (progressEvent: unknown) => {
        const percentComplete = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        );

        setValue(percentComplete);
      },
    };
    axios
      .get("https://picsum.photos/800/800", options)
      .then((response) => {
        setImageBlob(response.data);
      })
      .catch((error) => console.log(error));
  };
  // getImage();
  useEffect(() => {
    getImage();
    // let timerId = 0;
    // if (value < 100) {
    //   clearInterval(timerId);
    //   timerId = setInterval(() => {
    //     setValue((value) => value + 0.1);
    //   }, 10);
    // }
    // return () => {
    //   clearInterval(timerId);
    // };
  }, []);
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setCursorPosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cursorSize = 20; // Adjust the size of the cursor
  const cursorOffset = cursorSize / 2; // Calculate half of the cursor size

  const cursorStyle = {
    position: "absolute",
    top: cursorPosition.y + cursorOffset + "px", // Center vertically
    left: cursorPosition.x + cursorOffset + "px", // Center horizontally
    width: cursorSize + "px",
    height: cursorSize + "px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "50%",
    pointerEvents: "none", // Ensure the cursor doesn't block interactions
    transform: "translate(-50%, -50%)", // Center the cursor using a transform
    opacity: 0,
  };

  return (
    <>
      <div className="container">
        <div style={cursorStyle}></div>
        <h1>Progress Bar</h1>
        <ProgressBar value={value} onComplete={() => setIsComplete(true)} />
        {isComplete ? "Conpleted" : "Loading..."}

        {imageBlob && (
          <div>
            <img
              className="image-container"
              src={URL.createObjectURL(imageBlob)}
              alt="Downloaded Image"
              width="400vh"
              style={{ borderRadius: "15px", objectFit: "cover" }}
            />
          </div>
        )}
        <button className="btn" onClick={getImage}>
          Get Image
        </button>
      </div>
    </>
  );
}

export default App;
