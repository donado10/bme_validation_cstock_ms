import { IBill } from "../Store/features/bills";
import { getDay } from "../Utils/Functions";

export async function rbrunLoader() {
  const date = getDay();

  const response = await fetch(
    `http://bme_api.test:8080/api/documents?date=${date}&souche=RFV`,
  );

  const data: IBill[] = await response.json();

  return data;
}
