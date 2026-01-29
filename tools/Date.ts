export const formattedDate = (date: string | Date, showHour?: boolean) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(showHour ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
};
