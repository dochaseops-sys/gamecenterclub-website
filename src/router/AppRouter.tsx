import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes.config";
import IRouteInterface from "../interfaces/IRouteInterface";
import ScrollToTop from "../components/ScrollToTop";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {routes.map((route: IRouteInterface, index: number) => (
          <Route path={route.path} element={<route.component />} key={index} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
