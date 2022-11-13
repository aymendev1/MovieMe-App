import React from "react";
import SideBar from "./components/sidebar";
import Home from "./layout/homeLayout";
import { Helmet } from "react-helmet";
function App() {
  return (
    <div>
      <SideBar />
      <Home />
      <Helmet>
        <script src="/script.js" type="text/javascript" />
      </Helmet>
    </div>
  );
}

export default App;
