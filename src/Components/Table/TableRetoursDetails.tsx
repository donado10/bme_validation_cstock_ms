import { useEffect, useState } from "react";
import { formatNumberWithSpace } from "../../Utils/Functions";
import Title from "../Title";
import Table from "./Table";
import { useSelector } from "react-redux";
import { IRetour } from "../../Store/features/retour";
import { IRootState } from "../../Store/store";

export const RetourDetails: React.FC<{
  onRemoveRetourDetails: React.Dispatch<{ status: boolean; piece: string }>;
  piece: string;
}> = ({ onRemoveRetourDetails, piece }) => {
  const [data, setData] = useState<IRetour | null>(null);
  const retourSelector = useSelector((state: IRootState) => state.retours);
  useEffect(() => {
    const retour = retourSelector.retourLists.find(
      (retour) => retour.DO_Piece === piece,
    );

    if (retour) {
      setData(retour);
    }
  }, [location]);

  return (
    <div
      className="overlay fixed inset-0 h-screen w-screen bg-black/50"
      onClick={(e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("wrapper")) {
          onRemoveRetourDetails({ status: false, piece: "" });
        }
      }}
    >
      <div className="wrapper relative h-screen w-screen bg-transparent">
        <div className="retour-detail custom-animation-fade-in absolute right-0 top-0 flex h-full w-4/5 flex-col gap-8 bg-white p-4">
          <div>
            <Title name={piece} />
          </div>
          <div className="sm:overflow-x-scroll h-fit w-full overflow-scroll rounded-lg border-2 border-bme-bg [&::-webkit-scrollbar]:hidden">
            <Table>
              <Table.Header>
                <Table.HeaderValue
                  value={"Référence article"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Designation article"}
                  customClass="w-2/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Prix Unitaire HT"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Quantité"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Montant HT"}
                  customClass="w-1/6   border-gray-300/15  py-2 text-center text-md font-semibold"
                />
              </Table.Header>
              <Table.Body>
                {data &&
                  data?.DO_Ligne?.length > 0 &&
                  data.DO_Ligne.map((ligne, i) => {
                    return (
                      <Table.BodyRow key={i} rowID={i}>
                        <Table.BodyValue
                          value={ligne.AR_Ref}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={ligne.DL_Design}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={formatNumberWithSpace(
                            Math.abs(ligne.DL_PrixUnitaire),
                          )}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={Math.abs(ligne.DL_Qte)}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={formatNumberWithSpace(
                            Math.abs(ligne.DL_MontantHT),
                          )}
                          customClass=" border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800  "
                        />
                      </Table.BodyRow>
                    );
                  })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
