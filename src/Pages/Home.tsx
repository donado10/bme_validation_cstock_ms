import { Link } from "react-router-dom";
import { RxExternalLink } from "react-icons/rx";

const Home = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <main className="shadow-main xs:fit m-14 flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-10 xl:w-2/5">
        <div className="w-96 rounded-lg border-2 border-bme-bg">
          <Link
            className="m-2 flex w-full items-center justify-between px-4"
            to={"validation/laprine"}
          >
            <span>Laprine</span>
            <span>
              <RxExternalLink />
            </span>
          </Link>
        </div>
        <div className="w-96 rounded-lg border-2 border-bme-bg">
          <Link
            className="m-2 flex w-full items-center justify-between px-4"
            to={"validation/rbrun"}
          >
            <span>Robert Brun</span>
            <span>
              <RxExternalLink />
            </span>
          </Link>
        </div>
        <div className="w-96 rounded-lg border-2 border-bme-bg">
          <Link
            className="m-2 flex w-full items-center justify-between px-4"
            to={"validation/intendance"}
          >
            <span>Intendance</span>
            <span>
              <RxExternalLink />
            </span>
          </Link>
        </div>
        <div className="w-96 rounded-lg border-2 border-bme-bg">
          <Link
            className="m-2 flex w-full items-center justify-between px-4"
            to={"transfert"}
          >
            <span>Transfert</span>
            <span>
              <RxExternalLink />
            </span>
          </Link>
        </div>
        <div className="w-96 rounded-lg border-2 border-bme-bg">
          <Link
            className="m-2 flex w-full items-center justify-between px-4"
            to={"retour"}
          >
            <span>Retour</span>
            <span>
              <RxExternalLink />
            </span>
          </Link>
        </div>
        <div className="w-96 rounded-lg border-2 border-bme-bg">
          <Link
            className="m-2 flex w-full items-center justify-between px-4"
            to={"achat"}
          >
            <span>Achat</span>
            <span>
              <RxExternalLink />
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
