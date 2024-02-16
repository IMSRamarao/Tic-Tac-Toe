import React, { useCallback, useEffect, useMemo, useState } from "react";
import './App.css';
const Square = ({value, squareClick}) => {
  return (
    <button
    style={{
      border: "1px solid #999",
      height: '34px',
      width: '34px',
      lineHeight: '34px',
      fontSize: '24px',
      fontWeight: 'bold',
      backgroundColor: 'white',
      float: 'left',
      marginTop: '-1px',
      marginRight: '-1px',
      textAlign: 'center'
    }}
    onClick={squareClick}
    >
      {value}
    </button>
  )
}

const calculateWinner = (arr) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2,4,6]
  ]
  for(let i=0; i<lines.length; i++) {
    const [a,b,c] = lines[i]
    if(arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
      return arr[a];
    }
  }
  return null;
}

const Timer = ({start, stop}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null
    if(start) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1 )
      }, 1000);
    } else if(!start && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval)
  }, [start, seconds] );

  return (
    <div>
    <p>seconds: {seconds}</p>
    <button onClick={stop}>stop</button>
    </div>
  )
}



const ExpensiveCalculation = ({number}) => {
  const calculatefactorial = (n) => {
    if(n < 0) {
      return -1;
    }
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * calculatefactorial(n-1);
  }
  const factorial = useMemo(() => {
    console.log('calculate factorial')
    return calculatefactorial(number);
  }, [number])
  return (
    <p>
      {number}! = {factorial}
    </p>
  )
}

function App() {
  const [arr, setArr] = useState(Array(9).fill(null))
  const [isXvalue, setIsXvalue] = useState(true)
  const [start, setStart] = useState(false)
  const [number, setNumber] = useState(0)

  const handleClick = (i) => {
    if(arr[i] || calculateWinner(arr)) {
      return;
    }
    const nextArr = arr.slice();
    if(isXvalue) {
      nextArr[i] = 'X'
    } else {
      nextArr[i] = 'O'
    }
    setArr(nextArr);
    setIsXvalue(!isXvalue);
  }
  const winner = calculateWinner(arr)
  let status;
  if(winner) {
    status = "Winner is: " + winner;
  } else if(arr.includes(null)) {
    status = "Next Player: " + (isXvalue? 'X' : 'O')
  } else {
    status = 'Tie...........'
  }

  const handleStart = useCallback(() => {
    console.log('start')
    setStart(true);
  }, [])
  const handleStop = useCallback(() => {
    console.log('stop')
    setStart(false);
  }, [])

  const handleChange = (e) => {
    setNumber(e.target.value)
  }
  
  function getCurrentTime() {
    // Get the current 'global' time from an API using Promise
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        var didSucceed = Math.random() >= 0.5;
        didSucceed ? resolve(new Date()) : reject('Error');
      }, 2000);
    })
  }
  getCurrentTime()
    .then(currentTime => getCurrentTime())
    .then(currentTime => {
      console.log('The current time is: ' + currentTime);
      return true;
    })
    .catch(err => console.log('There was an error:' + err))
  return (
    <div style={{
      marginLeft: '100px'
    }}>
      <h1>{status}</h1>
      <div className="board-row">
        <Square value={arr[0]} squareClick={() => handleClick(0)} />
        <Square value={arr[1]} squareClick={() => handleClick(1)} />
        <Square value={arr[2]} squareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={arr[3]} squareClick={() => handleClick(3)} />
        <Square value={arr[4]} squareClick={() => handleClick(4)} />
        <Square value={arr[5]} squareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={arr[6]} squareClick={() => handleClick(6)} />
        <Square value={arr[7]} squareClick={() => handleClick(7)} />
        <Square value={arr[8]} squareClick={() => handleClick(8)} />
      </div>
      <div>
        <h1>Timer App</h1>
        <button onClick={handleStart}>start</button>
        <Timer start={start} stop={handleStop}/>
      </div>

      <div>
        <h1>Expensive calaculator App</h1>
        <input type="number" value={number} onChange={handleChange} />
        <ExpensiveCalculation number={number} />
      </div>
    </div>
  )
}

export default App;