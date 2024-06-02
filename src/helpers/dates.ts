// export const formatDate = (date: Date | string) => {
//   const dt = new Date(date);
//   const day = dt.getDate();
//   const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(dt);
//   const year = dt.getFullYear();
//   let hours = dt.getHours();
//   const minutes = dt.getMinutes();
//   const ampm = hours >= 12 ? "PM" : "AM";
//   hours = hours > 12 ? hours / 12 : hours;

//   // Function to add ordinal suffix to the day (e.g., "th", "st", "nd", "rd")
//   const addOrdinalSuffix = (day: number) => {
//     if (day >= 11 && day <= 13) {
//       return day.toString() + "th";
//     }
//     const lastDigit = day % 10;
//     if (lastDigit === 1) {
//       return day.toString() + "st";
//     } else if (lastDigit === 2) {
//       return day.toString() + "nd";
//     } else if (lastDigit === 3) {
//       return day.toString() + "rd";
//     } else {
//       return day.toString() + "th";
//     }
//   };

//   const formattedDate = `${addOrdinalSuffix(
//     day
//   )} ${month}, ${year} ${hours}:${minutes} ${ampm}`;

//   return formattedDate;
// };

export const formatDate = (date: Date | string): string => {
  const dt = new Date(date);
  const day = dt.getDate();
  const month = dt.toLocaleString("en-US", { month: "short" });
  const year = dt.getFullYear();
  let hours = dt.getHours();
  const minutes = dt.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM

  const addOrdinalSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const formattedDate = `${addOrdinalSuffix(
    day
  )} ${month}, ${year} ${hours}:${minutes} ${ampm}`;

  return formattedDate;
};
