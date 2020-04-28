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

    let idsList: opportunitiesIds = useSelector((state: RootState) => state.opportunities.ids);
    let torreUser: ITorreAPIUser = useSelector((state: RootState) => state.torreUser.user);
    let fitness = useSelector((state: RootState) => state.fitness);

    const fitnessError = useSelector((state: RootState) => state.fitness.error);
    const idsListError = useSelector((state: RootState) => state.opportunities.error);
    const torreUserError = useSelector((state: RootState) => state.torreUser.error);

    const [sortedOppList, setsortedOppList] = useState([] as any);
    const [fitnessObj, setFitnessObj] = useState({} as any);
    const [torreUsr, setTorreUsr] = useState({} as any);

    const sortBy = "timesInSearch";

    const companiesTopLength = 20;

    useEffect(() => {
        dispatch(fetchTorreData(" "));
    }, []);

    useEffect(() => {
        if (fitnessError !== null || idsListError !== null || torreUserError !== null) {
            setTorreUsr({});
            setFitnessObj({});
            setsortedOppList([]);
        }
    }, [fitnessError, idsListError, torreUserError]);

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
            if (a.timesInSearch < b.timesInSearch) {
                return 1;
            }
            if (a.timesInSearch > b.timesInSearch) {
                return -1;
            }
            return 0;
        });
        console.log("ids length", sortedOpportunities.length);
        console.log("max value", sortedOpportunities[0], sortedOpportunities[sortedOpportunities.length - 1]);
        setsortedOppList(
            sortedOpportunities.slice(
                0,
                sortedOpportunities.length > companiesTopLength ? companiesTopLength : sortedOpportunities.length
            )
        );
    }, [idsList]);

    useEffect(() => {
        setFitnessObj(fitness);
        setTorreUsr(torreUser);
    }, [fitness, torreUser]);

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
            user={torreUsr}
            fitness={fitnessObj}
            idsList={sortedOppList}
        ></CompanyFitView>
    );
};
