// export const formateDate = (date: Date | string) => {
//   const dt = new Date(date);
//   const formattedDate = dt?.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
//   return formattedDate;
// };
export const formatDate = (date: Date | string) => {
  const dt = new Date(date);
  const day = dt.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(dt);
  const year = dt.getFullYear();
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Function to add ordinal suffix to the day (e.g., "th", "st", "nd", "rd")
  const addOrdinalSuffix = (day: number) => {
    if (day >= 11 && day <= 13) {
      return day.toString() + "th";
    }
    const lastDigit = day % 10;
    if (lastDigit === 1) {
      return day.toString() + "st";
    } else if (lastDigit === 2) {
      return day.toString() + "nd";
    } else if (lastDigit === 3) {
      return day.toString() + "rd";
    } else {
      return day.toString() + "th";
    }
  };

  const formattedDate = `${addOrdinalSuffix(
    day
  )} ${month}, ${year} ${hours}:${minutes} ${ampm}`;

  return formattedDate;
};
