import React, { useState, useEffect } from "react";
import "./companyFitStyles.scss";

import { MainButton } from "../../components/mainButton/mainButton";
import { InputLabel } from "../../components/inputLabel/inputLabel";
import { MainCard } from "../../components/mainCard/mainCard";
import { opportunitiesIds } from "../../redux/opportunities/torreOpportunitySlice";
import { CompanyFit } from "./CompanyFitContainer";

interface IViewProps {
    onNameSubmit: (userPublicId: string) => void;
    data?: string;
    idsList: [
        {
            id: string;
            timesInSearch: number;
            name: string;
            relevance: number;
        }
    ];
}

export const CompanyFitView = ({ onNameSubmit, idsList, data }: IViewProps) => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        console.log("hey view", idsList);
    });

    const renderCompaniesList = () => {
        let renderList: React.ReactNodeArray = [];

        idsList.forEach((company, index) => {
            renderList.push(
                <React.Fragment key={company.id}>
                    <MainCard>
                        <div className="company-list-row">
                            <div className="row-block rank">
                                <h3 className="title">Rank</h3>
                                <h2>#{index}</h2>
                            </div>
                            <div className="row-block">
                                <h3 className="title">Company</h3>
                                <h2>{company.name}</h2>
                            </div>
                            <div className="row-block">
                                <h3 className="title">Appeared in Searchs</h3>
                                <h2>{company.timesInSearch} Times</h2>
                            </div>
                            <div className="row-block">
                                <h3 className="title">Relevant Factor</h3>
                                <h2>{company.timesInSearch}</h2>
                            </div>
                        </div>
                    </MainCard>
                </React.Fragment>
            );
        });
        return renderList;
    };

    return (
        <div className="company-fit">
            <h1 className="big">this is the company fit</h1>
            <MainCard>
                <div className="main-header-card">
                    <InputLabel
                        label="Calculate The Top Companies For Your Skills"
                        onChange={e => {
                            console.log("changed", username);
                            setUsername(e.target.value);
                        }}
                        placeholder="type username id..."
                        negative={true}
                        value={username}
                    ></InputLabel>
                    <div className="button">
                        <MainButton
                            callback={e => {
                                onNameSubmit(username);
                            }}
                            text="GO"
                            negative={true}
                        ></MainButton>
                    </div>
                </div>
            </MainCard>

            <div>{renderCompaniesList()}</div>
        </div>
    );
};
