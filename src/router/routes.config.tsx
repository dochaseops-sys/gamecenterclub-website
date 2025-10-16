import IRouteInterface from "../interfaces/IRouteInterface";
import Home from "../views/Home";

export const routes: IRouteInterface[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "*",
    component: Home,
  },
];
