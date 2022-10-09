function getAiringDate(monthNum, year) {
  const allMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = allMonth[monthNum - 1];
  if (month && year) {
    return `${month}  ${year}`;
  } else if (year) {
    return year;
  } else if (month) {
    return month;
  } else {
    return "";
  }
}

const day = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export { getAiringDate, day };
