import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

const [dice, setDice] = React.useState(allNewDice());
const [time, setTime] = React.useState(0);
const [start, setStart] = React.useState(true);
const [tenzies, setTenzies] = React.useState(false);
const [rolls, setRolls] = React.useState(0);
const [bestRolls, setBestRolls] = React.useState(
    JSON.parse(localStorage.getItem("bestRolls")) || 0
);
const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem("bestTime")) || 0
);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setStart(false);
      setRollsTime();
    }
  }, [dice]);

  function setRollsTime() {
    if (!bestRolls || rolls < bestRolls) {
      setBestRolls(rolls);
    }
    if (!bestTime || time < bestTime) {
      setBestTime(time);
    }
  }

  React.useEffect(() => {
    localStorage.setItem("bestRolls", JSON.stringify(bestRolls));
  }, [bestRolls]);

  React.useEffect(() => {
    localStorage.setItem("bestTime", JSON.stringify(bestTime));
  }, [bestTime]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function holdDice(id) {

    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  function rollDice() {
    if (!tenzies) {
        setRolls(prevRolls => prevRolls + 1)
        setDice(oldDice =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
        setTenzies(false);
        setDice(allNewDice());
        setRolls(0);
        setTime(0);
        setStart(true);
    }
  }

  React.useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">T<span className="enzi">ENZI!!</span></h1>
            { tenzies? <p className="won">YOU WON!!!</p> : <p className="instructions"><i>Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</i></p> }
            
            <div className="timer-rolls">
                <p class="rolls">Rolls: {rolls}</p>
                <p className="timer">Timer: {time} s</p>
            </div>
            
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
            {tenzies ? "New Game" : "Roll"}
            </button>
            <div className="best-timer-rolls"> 
                <p className="best-rolls">Best Rolls : {bestRolls}</p>
                <p class="best-time">Best Time : {bestTime} s</p>
            </div>
        </main> 
    )
}