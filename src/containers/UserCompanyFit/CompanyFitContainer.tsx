import React, { useState, useEffect } from "react";
import { CompanyFitView } from "./CompanyFitView";
import { useSelector, useDispatch } from "react-redux";

import "./companyFitStyles.scss";

import { fetchTorreData } from "../../redux/users/torreUserSlice";
import { fecthOpportunitiesDetailsByIds, calculateCulturalFit } from "../../redux/fitness/torreFitnessSlice";
import { opportunitiesIds } from "../../redux/opportunities/torreOpportunitySlice";

import { RootState } from "store";
import { ITorreAPIUser } from "api/types";

interface Props {
    data: string;
}

export const CompanyFit = ({ data }: Props) => {
    const dispatch = useDispatch();

    const idsList: opportunitiesIds = useSelector((state: RootState) => state.opportunities.ids);
    const torreUser: ITorreAPIUser = useSelector((state: RootState) => state.torreUser.user);
    const fitness = useSelector((state: RootState) => state.fitness);

    const { currentPageIssues, isLoading, error: issuesError, issuesByNumber, pageCount } = useSelector(
        (state: RootState) => state.issues
    );

    const [sortedOppList, setsortedOppList] = useState([] as any);

    const sortBy = "timesInSearch";

    const companiesTopLength = 20;

    useEffect(() => {
        const sortedOpportunities = Object.keys(idsList).map(elem => {
            return {
                id: elem,
                timesInSearch: idsList[elem].timesInSearch,
                name: idsList[elem].name,
                relevance: idsList[elem].relevance,
            };
        });
        sortedOpportunities.sort((a, b) => {
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            if (a[sortBy] < b[sortBy]) {
                return -1;
            }
            return 0;
        });
        setsortedOppList(
            sortedOpportunities.slice(
                0,
                sortedOpportunities.length > companiesTopLength ? companiesTopLength : sortedOpportunities.length
            )
        );
    }, [idsList]);

    useEffect(() => {
        console.log("fitness");
    }, [fitness]);

    const onNameSubmit = (userPublicId: string) => {
        console.log("on Name", userPublicId);
        dispatch(fetchTorreData(userPublicId));
    };

    const calculateFitness = async () => {
        console.log("calculate");
        let oppIds = sortedOppList.map((elem: any) => elem.id);
        await dispatch(fecthOpportunitiesDetailsByIds(oppIds));
        await dispatch(calculateCulturalFit(torreUser));
    };

    return (
        <CompanyFitView
            calculateFitness={calculateFitness}
            onNameSubmit={onNameSubmit}
            user={torreUser}
            fitness={fitness}
            idsList={sortedOppList}
        ></CompanyFitView>
    );
};
