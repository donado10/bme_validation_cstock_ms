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
export function getDay(): string {
  const today = new Date();
  today.setDate(today.getDate());

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

  return firstDate <= secondDate ? date1 : date2;
}

export function formatTransfertWareHouse(de_no: string): string {
  if (de_no === "1") {
    return "Laprine";
  }
  if (de_no === "71") {
    return "Robert Brun";
  }

  if (de_no === "72") {
    return "Intendance";
  }
  if (de_no === "78") {
    return "SAV";
  }

  if (de_no === "2") {
    return "Expo LG";
  }
  if (de_no === "182") {
    return "Retour";
  }

  if (de_no === "209") {
    return "Camberene 1";
  }
  if (de_no === "210") {
    return "Camberene 2";
  }
  if (de_no === "211") {
    return "Camberene 3";
  }
  if (de_no === "212") {
    return "Camberene 4";
  }
  if (de_no === "213") {
    return "Camberene 5";
  }

  return de_no;
}

export function formatTransfertForBackend(warehouse: string): string {
  if (warehouse === "Laprine") {
    return "Laprine";
  }
  if (warehouse === "Robert Brun") {
    return "RB";
  }

  if (warehouse === "Intendance") {
    return "INT";
  }
  if (warehouse === "Expo LG") {
    return "EXP-LG";
  }
  if (warehouse === "SAV") {
    return "SAV";
  }
  if (warehouse === "Retour") {
    return "Retour";
  }
  if (warehouse === "Camberene 1") {
    return "CAMB1";
  }
  if (warehouse === "Camberene 2") {
    return "CAMB2";
  }
  if (warehouse === "Camberene 3") {
    return "CAMB3";
  }
  if (warehouse === "Camberene 4") {
    return "CAMB4";
  }
  if (warehouse === "Camberene 5") {
    return "CAMB5";
  }

  return warehouse;
}
