import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Sidebar from "./Components/Navbar/Sidebar";

const App = () => {
  return (
    <div>
      <Navbar />
      <main className=" flex">
        <Sidebar />
        <Home />
      </main>
    </div>
  );
};

export default App;
