import React from "react";
import { ApplicationRoutes } from "./Pages";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <ApplicationRoutes />
    </>
  );
};

export default App;
