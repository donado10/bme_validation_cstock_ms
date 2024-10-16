import { IBill } from "../Store/features/bills";
import { getDay } from "../Utils/Functions";

export async function laprineLoader() {
  const date = getDay();

  const response = await fetch(
    `http://bme_api.test:8080/api/documents?date=${date}&souche=LGV`,
  );

  const data: IBill[] = await response.json();

  return data;
}
