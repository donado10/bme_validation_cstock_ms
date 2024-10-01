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

export function formatDateToFull(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} 00:00:00.000`;
}

export function formatNumberWithSpace(num: number): string {
  return new Intl.NumberFormat("fr-FR").format(num);
}

export function getPreviousDay(): string {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  const year: number = today.getFullYear();
  const month: string = String(today.getMonth() + 1).padStart(2, "0");
  const day: string = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateToSend(dateString: string): string {
  const datePart: string = dateString.split(" ")[0];
  return datePart;
}

export function getEarlierDate(date1: string, date2: string): string {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  return firstDate < secondDate ? date1 : date2;
}
