import React, { useState, useEffect } from "react";
import "./companyFitStyles.scss";

import { MainButton } from "../../components/mainButton/mainButton";
import { InputLabel } from "../../components/inputLabel/inputLabel";
import { MainCard } from "../../components/mainCard/mainCard";
import { opportunitiesIds } from "../../redux/opportunities/torreOpportunitySlice";
import { CompanyFit } from "./CompanyFitContainer";

interface IViewProps {
    onNameSubmit: (userPublicId: string) => void;
    calculateFitness: () => void;
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

export const CompanyFitView = ({ calculateFitness, onNameSubmit, idsList, data }: IViewProps) => {
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
                                <h2>#{index + 1}</h2>
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
            <div className="left-section">
                <h1 className="big-title">this is the company fit</h1>
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

                <h1>The Top 20 companies that are more relevant according your skills</h1>
                <div>{renderCompaniesList()}</div>
            </div>
            <div className="right-section">
                <div>
                    <h1>Do you want to calculate your fitness with your company list?</h1>
                </div>
                <div className="button">
                    <MainButton
                        callback={e => {
                            calculateFitness();
                        }}
                        text="Calculate My Fitness"
                        negative={true}
                    ></MainButton>
                </div>
            </div>
        </div>
    );
};
