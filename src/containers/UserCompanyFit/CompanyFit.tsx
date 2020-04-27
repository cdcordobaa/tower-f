import React, { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./pure-forms.css";
import "./pure-buttons.css";

import { fetchIssuesCount } from "containers/RepoSearch/repoDetails";
import { fetchTorreData } from "./torreUserReducer";

interface Props {
    data: string;
}

type InputEvent = ChangeEvent<HTMLInputElement>;
type ChangeHandler = (e: InputEvent) => void;

export const CompanyFit = ({ data }: Props) => {
    const dispatch = useDispatch();

    const [currentOrg, setCurrentOrg] = useState(0);
    const [currentRepo, setCurrentRepo] = useState("me");
    const [currentPageText, setCurrentPageText] = useState("1");

    let userId = "cristian";

    return (
        <div>
            <h1 className="big">this is the company fit</h1>
            <button
                onClick={() => {
                    dispatch(fetchTorreData(userId));
                }}
            >
                Fetch Data
            </button>
        </div>
    );
};
