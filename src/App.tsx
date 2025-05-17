import "./App.css";
import Dies from "./components/Dies";
import { randomNumbers } from "./utils/randonNumbers";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WonModal from "./components/WonModal";

function App() {
  const [dice, setDice] = useState(randomNumbers());
  const [hasWon, setHasWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isSecondPlayer, setIsSecondPlayer] = useState(false);
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSame = dice.every((die) => die.value === dice[0].value);
    if (isSecondPlayer) {
      if (
        (allHeld && allSame) ||
        parseInt(localStorage.getItem("moves1") || "0") < moves
      ) {
        setHasWon(true);
      }
    } else {
      if (allHeld && allSame) {
        setHasWon(true);
      }
    }
  }, [dice, moves, isSecondPlayer]);

  const rollDice = () => {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 6) + 1 };
      });
    });
    setMoves((oldMoves) => oldMoves + 1);
  };

  const holdDice = (id: string) => {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  };

  const startNewGame = () => {
    setDice(randomNumbers());
    setHasWon(false);
    localStorage.setItem("moves1", moves.toString());
    setMoves(0);
    setIsSecondPlayer(true);
  };
  const BrandNewGame = () => {
    setDice(randomNumbers());
    setHasWon(false);
    setMoves(0);
    setIsSecondPlayer(false);
  };

  return (
    <div className="bg-[#0b2434] h-screen w-screen flex justify-center items-center">
      <div className="bg-white w-152 h-152 flex flex-col items-center justify-center rounded-xl">
        <h1 className="text-2xl text-center font-bold ">Tenzies</h1>
        <p className="text-xl text-center font-bold pl-10 pr-10 pb-6">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        {isSecondPlayer ? (
          <p className="text-xl text-center text-red-500 font-bold pl-10 pr-10 pb-6">
            Player 2
          </p>
        ) : (
          <p className="text-xl text-center text-blue-500 font-bold pl-10 pr-10 pb-6">
            Player 1
          </p>
        )}
        <motion.div
          className="p-10 border-2 border-gray-100 shadow-lg grid grid-cols-5 gap-11 items-center justify-center"
          initial={{ opacity: 0, z: 50 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 0.3 }}
        >
          {dice.map((die) => (
            <Dies
              key={die.id}
              value={die.value}
              isHeld={die.isHeld}
              onClick={() => holdDice(die.id)}
            />
          ))}
        </motion.div>
        <motion.div
          className="mt-10 flex justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            className="bg-[#f1ca7d] text-black  h-10 w-20 px-4 py-2 rounded-md cursor-pointer hover:bg-[#f1ca7d]/60"
            onClick={rollDice}
          >
            Roll
          </button>
        </motion.div>
        <motion.div
          className="mt-10 flex justify-center items-center"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isSecondPlayer ? (
            <p>
              Moves of player 1 :<span>{localStorage.getItem("moves1")}</span>
              <br />
              Moves of Player 2: <span className="font-bold">{moves}</span>
            </p>
          ) : (
            <p className="text-center">
              Moves of player 1: <span className="font-bold">{moves}</span>
            </p>
          )}
        </motion.div>
      </div>
      {!isSecondPlayer
        ? hasWon && (
            <WonModal
              onNewGame={startNewGame}
              moves={moves}
              isSecondPlayer={isSecondPlayer}
            />
          )
        : hasWon && (
            <WonModal
              onNewGame={BrandNewGame}
              moves={moves}
              isSecondPlayer={isSecondPlayer}
            />
          )}
    </div>
  );
}

export default App;
