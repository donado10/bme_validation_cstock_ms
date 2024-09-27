export function formatDate(inputDate: string) {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const dateObj = new Date(inputDate);
  const day = String(dateObj.getDate()).padStart(2, "0"); // Get day with leading zero
  const month = months[dateObj.getMonth()]; // Get month from the array
  const year = dateObj.getFullYear(); // Get the year

  return `${day} ${month} ${year}`;
}
