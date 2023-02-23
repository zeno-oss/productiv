const PALETTE = {
  black: "#141414",
  white: "#fff",
  gray: "#9F9F9F",
  // "gray-50": "#E3E3E3",
  lightGray: "#E3E3E3",
  banana: "#FCE114",
  darkBanana: "#E1CB13",
  turquoise: "#4BEED1",
  darkTurquoise: "#1AA58C",
  pictonBlue: "#46D2EF",
  darkPictonBlue: "#59C7DE",
  vodka: "#B7ADFF",
  darkVodka: "#A59CE6",
  radicalRed: "#F82867",
  darkRadicalRed: "#E11D5A",
  coral: "#F5815C",
  darkCoral: "#E16A4B",
  dodgerBlue: "#2B8CFB",
  darkDodgerBlue: "#1E6ED8",
  plumPurple: "#A949C1",
  darkPlumPurple: "#8F3DAF",
};

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
