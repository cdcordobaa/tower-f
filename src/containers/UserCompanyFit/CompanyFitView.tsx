import React, { useState, useEffect } from "react";
import "./companyFitStyles.scss";

import { MainButton } from "../../components/mainButton/mainButton";
import { InputLabel } from "../../components/inputLabel/inputLabel";
import { MainCard } from "../../components/mainCard/mainCard";
import { UserWithAvatar } from "components/avatar/UserWithAvatar";
import { ITorreAPIUser } from "api/types";

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
    fitness: any;
    user: ITorreAPIUser;
}

export const CompanyFitView = ({ user, fitness, calculateFitness, onNameSubmit, idsList, data }: IViewProps) => {
    const [username, setUsername] = useState("");

    const renderCompaniesList = () => {
        let renderList: React.ReactNodeArray = [];

        idsList.forEach((company, index) => {
            renderList.push(
                <React.Fragment key={company.id}>
                    <MainCard>
                        <React.Fragment>
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
                        </React.Fragment>
                    </MainCard>
                </React.Fragment>
            );
        });
        return renderList;
    };

    const renderFitness = () => {
        if (!fitness || !fitness.fitness || fitness.fitness.length == 0) {
            return;
        }

        let list = fitness.companies.map((elem: any) => {
            return (
                <div className="fitness-container">
                    <div className="fit-item">
                        <div className="fit-img">
                            <UserWithAvatar
                                user={{ avatar_url: elem.organizations[0].picture }}
                                orientation="horizontal"
                            />
                            <div className="fit-img">
                                <h3>{elem.organizations[0].name}</h3>
                            </div>
                        </div>
                        <div className="fit-info">
                            <div>
                                <h1 className="fit-level-title">Fitness Level</h1>
                                <h3>{fitness.fitness[elem.id] ? fitness.fitness[elem.id].culturalFit : ""}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="fit-roles">
                        <h1>Roles: </h1>
                        {elem.strengths.map((item: any) => (
                            <h3> {` ${item.name}, `} </h3>
                        ))}
                    </div>
                </div>
            );
        });

        return list;
    };

    return (
        <div className="company-fit">
            <div className="scroller">
                <div className="left-section">
                    <h1 className="big-title">
                        This App allows you to calculate the level of fitness between you and a potential opportunity -
                        <strong> powered by TORRE data </strong>
                    </h1>
                    <MainCard>
                        <React.Fragment>
                            <h4 className="muted -ext">
                                Write down you public user id from torre. I.e : cristiandanielcordobaaguirre
                            </h4>
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
                            {user && user.person && (
                                <div className="user-info">
                                    <UserWithAvatar
                                        user={{ avatar_url: user.person.picture ? user.person.picture : "" }}
                                    />
                                    <h1>{user.person.name}</h1>
                                    <h1>{user.person.professionalHeadline}</h1>
                                </div>
                            )}
                        </React.Fragment>
                    </MainCard>

                    <h1>The Top 20 companies that are more relevant according your skills</h1>
                    <div>{renderCompaniesList()}</div>
                </div>
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
                {renderFitness()}
            </div>
        </div>
    );
};
