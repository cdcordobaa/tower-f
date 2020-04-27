import React, { useState, useEffect } from "react";
import { CompanyFitView } from "./CompanyFitView";
import { useSelector, useDispatch } from "react-redux";

import "./companyFitStyles.scss";

import { fetchTorreData } from "../../redux/users/torreUserSlice";
import { opportunitiesIds } from "../../redux/opportunities/torreOpportunitySlice";

import { RootState } from "store";

interface Props {
    data: string;
}

export const CompanyFit = ({ data }: Props) => {
    const dispatch = useDispatch();

    const idsList: opportunitiesIds = useSelector((state: RootState) => state.opportunities.ids);

    const { currentPageIssues, isLoading, error: issuesError, issuesByNumber, pageCount } = useSelector(
        (state: RootState) => state.issues
    );

    const [currentOrg, setCurrentOrg] = useState(0);
    const [currentRepo, setCurrentRepo] = useState("me");
    const [currentPageText, setCurrentPageText] = useState("1");

    useEffect(() => {
        console.log("hey", idsList, currentPageIssues);
    }, [dispatch]);

    let userId = "cristian";

    const onNameSubmit = (userPublicId: string) => {
        console.log("on Name", userPublicId);
        dispatch(fetchTorreData(userId));
    };

    return <CompanyFitView onNameSubmit={onNameSubmit} idsList={idsList}></CompanyFitView>;
};
