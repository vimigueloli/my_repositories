import React from "react";

interface RadioProps {
    status: boolean;
    changeStatus: Function;
}

export default function Radio({ status, changeStatus }: RadioProps) {
    return (
        <div
            className="w-4 h-4 p-[3px] rounded-full border border-purple-300"
            onClick={() => changeStatus(!status)}
        >
            <div
                className={`w-full h-full rounded-full with-transition ${
                    status ? "bg-purple-300" : "bg-transparent"
                }`}
            />
        </div>
    );
}
