import React from "react";
import "./styles.scss";

interface Props {
    callback?: (e: React.MouseEvent) => void;
    text: string;
    negative?: boolean;
    icon?: string;
}

export const MainButton = ({ text, negative, icon, callback }: Props) => {
    return (
        <div>
            <button
                className={`main-button ${negative ? "negative" : ""}`}
                onClick={e => {
                    if (callback) {
                        callback(e);
                    }
                }}
            >
                {text}
            </button>
        </div>
    );
};
