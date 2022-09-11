import { Rounds } from 'Utils/Calculate';

const GEDCalculate = (score: number, perfectScore: number) => {
  return Rounds((1 - score / perfectScore) * 100, 3);
};

export default GEDCalculate;
