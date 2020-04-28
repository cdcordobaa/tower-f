import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";

import { CompanyFit } from "./containers/UserCompanyFit/CompanyFitContainer";

import { RootState } from "./store";

const App: React.FC = () => {
    const dispatch = useDispatch();

    let content;

    let torreUserUi = (
        <React.Fragment>
            <CompanyFit data="im teling you, this is cool" />
        </React.Fragment>
    );
    return <div className="App">{torreUserUi}</div>;
};

export default App;
