export const dateFormater = (date: string | undefined) => {
  if (date == undefined) {
    return "";
  }

  const parsedDate = new Date(date);

  return parsedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};
