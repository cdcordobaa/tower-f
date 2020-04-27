import React from "react";
import "./styles.scss";

interface Props {
    label?: string;
    onChange: (e: React.ChangeEvent) => void;
    negative?: boolean;
    value?: string;
    placeholder?: string;
    type?: string;
}

export const InputLabel = ({ label, onChange, negative, value, placeholder, type }: Props) => {
    return (
        <div className="main-input">
            <label className={`t-label ${negative ? "negative" : "normal"}`}>{label}</label>
            <input
                type={type || "text"}
                placeholder={placeholder}
                onChange={e => {
                    onChange(e);
                }}
                value={value}
            />
        </div>
    );
};
