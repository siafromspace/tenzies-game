import React from "react"
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }

  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDie(id) {
    setDice(prevDice => prevDice.map(die => {
      return id === die.id ?
        {
          ...die,
          isHeld: !die.isHeld
        } : die
    })
    )
  }

  const diceElements = dice.map(die => {
    return <Dice
      value={die.value}
      key={die.id}
      holdDie={() => holdDie(die.id)}
      isHeld={die.isHeld} />
  })

  return (
    <div className="container">
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-wrapper">
        {diceElements}
      </div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </div>
  );
}

export default App;




