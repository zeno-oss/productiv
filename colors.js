/**
 * Specify your custom tailwind colors here.
 */
const colors = require("./colors.json");

if (typeof module !== "undefined" && module.exports)
  module.exports = {
    ...colors,
  };

// export default colors;
