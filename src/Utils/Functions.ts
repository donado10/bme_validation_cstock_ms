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
  const depotMap = new Map<string, string>([
    ["1", "Laprine"],
    ["2", "Expo LG"],
    ["71", "Robert Brun"],
    ["72", "Intendance"],
    ["78", "SAV"],
    ["182", "Retour"],
    ["209", "Camberene 1"],
    ["210", "Camberene 2"],
    ["211", "Camberene 3"],
    ["212", "Camberene 4"],
    ["213", "Camberene 5"],
    ["81", "E ZONE (fict)"],
    ["82", "SENEGALAISE SXMTC (fict)"],
    ["83", "AL Bilal (fict)"],
    ["84", "CCBM Electronics (fict)"],
    ["85", "ELECTRONIC CORP (fict)"],
    ["87", "HOMETECH (fict)"],
    ["90", "ELECTROPLUS (fict)"],
    ["93", "ATLAS COMMERCIAL CENTER (fict)"],
    ["105", "MASSATA EQUIPEMENT (fict)"],
    ["110", "OFFICE CHOICE (fict)"],
    ["121", "ABDOULAHAD MBAYE (fict)"],
    ["126", "SKD DISTRIBUTION (fict)"],
    ["127", "ROYAL GIANT (fict)"],
    ["131", "DIA ELECTRONICS (fict)"],
    ["150", "DEPOT CAC (fict)"],
    ["156", "BIBLOS SENEGAL (fict)"],
    ["167", "SECKENE EQUIPEMENT ET SERVICES (fict)"],
    ["179", "GUANGZHOU ELECTRICAL (fict)"],
    ["191", "SNCIS SARL (fict)"],
    ["214", "EBS REFUS DE PRENDRE (fict)"],
    ["215", "AL RACHID SUARL (fict)"],
    ["216", "TRI STAR ELECTRONICS (fict)"],
    ["217", "ATLAS CONCEPT (fict)"],
    ["218", "CONSTRUCTION ET EQUIPEMENT (fict)"],
  ]);

  return depotMap.get(de_no) || "";
}

export function formatTransfertForBackend(warehouse: string): string {
  const depotMap = new Map<string, string>([
    ["Laprine", "Laprine"],
    ["Robert Brun", "RB"],
    ["Intendance", "INT"],
    ["Expo LG", "EXP-LG"],
    ["SAV", "SAV"],
    ["Retour", "Retour"],
    ["Camberene 1", "CAMB1"],
    ["Camberene 2", "CAMB2"],
    ["Camberene 3", "CAMB3"],
    ["Camberene 4", "CAMB4"],
    ["Camberene 5", "CAMB5"],
    [ "E ZONE","EZO"],
    [ "SENEGALAISE SXMTC","SXMTC"],
    [ "AL Bilal","GETCO"],
    [ "CCBM Electronics","CCBM"],
    [ "ELECTRONIC CORP","EC"],
    [ "HOMETECH","HOM"],
    [ "ELECTROPLUS","ELEC"],
    [ "ATLAS COMMERCIAL CENTER","ATLAS"],
    [ "MASSATA EQUIPEMENT","MASSATA"],
    [ "OFFICE CHOICE","OFFICE"],
    [ "ABDOULAHAD MBAYE","LATE"],
    [ "SKD DISTRIBUTION","SKD"],
    [ "ROYAL GIANT","ROYAL"],
    [ "DIA ELECTRONICS","DIAELEC"],
    [ "DEPOT CAC","CAC"],
    [ "BIBLOS SENEGAL","BIBLOS"],
    [ "SECKENE EQUIPEMENT ET SERVICES","SECKENE"],
    [ "GUANGZHOU ELECTRICAL","GUANG"],
    [ "SNCIS SARL","SNCIS"],
    [ "EBS REFUS DE PRENDRE","EBS"],
    [ "AL RACHID SUARL","ALRACHI"],
    [ "TRI STAR ELECTRONICS","TRISTAR"],
    [ "ATLAS CONCEPT","ATLAS"],
    [ "CONSTRUCTION ET EQUIPEMENT","CONST"],

  ]);

  return depotMap.get(warehouse) || "";
}
