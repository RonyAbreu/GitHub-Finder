import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home.tsx";
import PageNotFound from "./routes/PageNotFound.tsx";
import Repository from "./routes/Repository.tsx";

import "./index.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/" element={<Home />}/>
          <Route index path="/repos/:username" element={<Repository />}/>
          <Route path="*" element={<PageNotFound />}/>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
