import IRouteInterface from "../interfaces/IRouteInterface";
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
    path: "*",
    component: Home,
  },
];
