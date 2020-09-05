import React, { useState, useEffect, useRef, useCallback } from "react";
import throttle from "lodash.throttle";
import "./App.css";

function App() {
  const [grid, setGrid] = useState(
    //Array.from({ length: 10 }).fill(Array.from({ length: 10 }).fill(0))
    Array.from({ length: 50 }, () => Array.from({ length: 50 }, () => false))
  );
  const operations = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [0, -1],
    [-1, 0],
  ];
  const [isDrawing, setDrawing] = useState(false);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const onClick = throttle((e) => {
    const indexies = e.target.id.split(",");
    const x = indexies[0];
    const y = indexies[1];
    console.log('qwe')
    setGrid([...grid], (grid[x][y] = !grid[x][y]));
  },5000)

  const shiet = () => {
    console.log("qwe");
  };



  const start = useCallback(() => {
    setGrid((grid) => {
      let gridCopy = Array.from({ length: 50 }, () =>
        Array.from({ length: 50 }, () => false)
      );

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = y + j;
            if (
              newI >= 0 &&
              newI < grid.length &&
              newJ >= 0 &&
              newJ < grid.length
            ) {
              neighbors += grid[newI][newJ];
            }
          });
          if (grid[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
            gridCopy[i][j] = false;
          } else if (grid[i][j] == 1 && (neighbors === 2 || neighbors === 3)) {
            gridCopy[i][j] = true;
          } else if (grid[i][j] == 0 && neighbors === 3) {
            gridCopy[i][j] = true;
          }
        }
      }
      return gridCopy;
    });
    console.log(grid);
    setTimeout(start, 500);
  }, []);

  return (
    <React.Fragment>
      <div className="main" onClick={onClick}>
        {grid.map((item, id) => (
          <div key={id} className="work">
            {item.map((i, idx) => (
              <div
                key={idx}
                id={[id, idx]}
                className={!i ? "field" : "field one"}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          start();
        }}
      >
        {running ? "stop" : "start"}
      </button>
    </React.Fragment>
  );
}

export default App;
