import { nanoid } from "nanoid";

export const randomNumbers = () => {
  const newDice: {
    value: number;
    isHeld: boolean;
    id: string;
  }[] = [];
  for (let i = 0; i < 10; i++) {
    newDice.push({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    });
  }
  return newDice;
};
