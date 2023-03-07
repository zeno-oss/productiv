import PALETTE from "../../colors.json";
console.log({ PALETTE: PALETTE });
const TASKS_PALETTE = {
  BANANA: {
    backgroundColor: "banana",
    borderColor: "darkBanana",
  },
  TURQUOISE: {
    backgroundColor: "turquoise",
    borderColor: "darkTurquoise",
  },
  PICTON_BLUE: {
    backgroundColor: "pictonBlue",
    borderColor: "darkPictonBlue",
  },
  VODKA: {
    backgroundColor: "vodka",
    borderColor: "darkVodka",
  },
  RADICAL_RED: {
    backgroundColor: "radicalRed",
    borderColor: "darkRadicalRed",
  },
  CORAL: {
    backgroundColor: "coral",
    borderColor: "darkCoral",
  },
  DODGER_BLUE: {
    backgroundColor: "dodgerBlue",
    borderColor: "darkDodgerBlue",
  },
  PLUM_PURPLE: {
    backgroundColor: "plumPurple",
    borderColor: "darkPlumPurple",
  },
} as const;

export { PALETTE, TASKS_PALETTE };
