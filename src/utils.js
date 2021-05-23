export const format = (date, format) => {
  const monthsFull = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December"
  ];
  const months = monthsFull.map(x => x.slice(0, 3));
  const monthsShort = Object.keys(monthsFull).map(x => {
    if (x < 10) return "0" + x;
    return x;
  });

  let dateInMonth = date.getDate();
  if (dateInMonth < 10) {
    dateInMonth = "0" + dateInMonth;
  }
  const month = date.getMonth();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  format = format
    .replace("MMMM", monthsFull[month])
    .replace("MMM", months[month])
    .replace("MM", monthsShort[month])
    .replace("M", parseInt(monthsShort[month]))
    .replace("DD", dateInMonth)
    .replace("D", parseInt(dateInMonth))
    .replace("YYYY", parseInt(year))
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("SS", seconds)
    ;

  return format;
};
