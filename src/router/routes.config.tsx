import IRouteInterface from "../interfaces/IRouteInterface";
import Game from "../views/Game";
import Home from "../views/Home";
import { RegistrationForm } from "../views/RegistrationForm";

export const routes: IRouteInterface[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/sign-up",
    component: RegistrationForm,
  },
  {
    path: "/games",
    component: Game,
  },
  {
    path: "*",
    component: Home,
  },
];
