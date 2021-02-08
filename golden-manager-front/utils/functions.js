export const objectValuesToUpperCase = (object) => {
  Object.entries(object).map((entry) => {
    if (typeof entry[1] === "string") object[entry[0]] = entry[1].toUpperCase();
  });
  return object;
};
