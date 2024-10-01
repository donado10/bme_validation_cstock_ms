import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="shadow-main m-14 rounded-xl bg-white">
      <div>
        <Link to={"/Laprine"}>Laprine</Link>
      </div>
      <div>
        <Link to={"/Rbrun"}>Robert Brun</Link>
      </div>
      <div>
        <Link to={"/Intendance"}>Intendance</Link>
      </div>
    </main>
  );
};

export default Home;
