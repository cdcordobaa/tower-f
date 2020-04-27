import React from "react";
import "./companyFitStyles.scss";

import { MainButton } from "../../components/mainButton/mainButton";
import { InputLabel } from "../../components/inputLabel/inputLabel";
import { MainCard } from "../../components/mainCard/mainCard";

interface IViewProps {
    data: string;
}

export const CompanyFitView = ({ data }: IViewProps) => {
    return (
        <React.Fragment>
            <MainCard>
                <React.Fragment>
                    <InputLabel
                        label="Get the top companies"
                        onChange={e => {
                            console.log("changed", e);
                        }}
                        placeholder="type username id..."
                        negative={true}
                    ></InputLabel>
                    <MainButton
                        callback={e => {
                            console.log("yay here", e);
                        }}
                        text="Calculate"
                        negative={true}
                    ></MainButton>
                </React.Fragment>
            </MainCard>
        </React.Fragment>
    );
};
