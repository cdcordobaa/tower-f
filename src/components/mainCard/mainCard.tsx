import React, { ReactNode } from "react";
import "./styles.scss";

interface Props {
    children?: ReactNode;
}

export const MainCard = ({ children }: Props) => {
    return <div className="main-card">{children}</div>;
};
