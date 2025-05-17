import { motion } from "framer-motion";
interface DiesProps {
  value: number;
  isHeld: boolean;
  onClick: () => void;
}

function Dies({ value, isHeld, onClick }: DiesProps) {
  return (
    <motion.div
      className={`border-2 border-gray-200 shadow-lg cursor-pointer w-16 h-16 rounded-md grid grid-cols-1 items-center justify-center
     ${isHeld ? "bg-green-500" : "bg-white"}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <h2 className="text-center font-bold text-xl">{value}</h2>
    </motion.div>
  );
}

export default Dies;
