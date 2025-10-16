import { FC, JSX } from "react";

interface IRouteInterface {
    path: string;
    component: FC | (() => JSX.Element)
}

export default IRouteInterface;
