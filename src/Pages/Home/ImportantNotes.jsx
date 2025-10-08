import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Navbar/Sidebar";

const ImportantNotes = () => {
  return (
    <>
      <Navbar />
      <main className="flex">
        <Sidebar />
        <div className="w-screen h-screen flex justify-center items-center bg-yellow-300">
          <h1>Importanr notes</h1>
        </div>
      </main>
    </>
  );
};

export default ImportantNotes;
