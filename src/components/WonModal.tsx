import { motion } from "framer-motion";

interface WonModalProps {
  onNewGame: () => void;
  moves: number;
  isSecondPlayer: boolean;
}

function WonModal({ onNewGame, moves, isSecondPlayer }: WonModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center gap-6"
      >
        {!isSecondPlayer ? (
          <>
            <h1 className="text-4xl font-bold text-[#0b2434]">Completed !!</h1>
            <p className="text-gray-600 text-lg">
              game completed in <span className="font-bold">{moves}</span> moves
            </p>
          </>
        ) : parseInt(localStorage.getItem("moves1") || "0") < moves ? (
          <>
            <h1 className="text-4xl font-bold text-[#0b2434]">
              Player 1 won the game !!
            </h1>
            <p className="text-gray-600 text-lg">
              game completed in <span className="font-bold">{moves}</span> moves
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-[#0b2434]">
              Player 2 won the game !!
            </h1>
          </>
        )}
        {isSecondPlayer ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#f1ca7d] text-black px-6 py-3 rounded-md font-semibold hover:bg-[#f1ca7d]/80 transition-colors"
            onClick={onNewGame}
          >
            Start a New Game!!
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#f1ca7d] text-black px-6 py-3 rounded-md font-semibold hover:bg-[#f1ca7d]/80 transition-colors"
            onClick={onNewGame}
          >
            Start a game for player 2!!
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default WonModal;
