import React from "react";

interface ToggleProps {
    status: boolean;
    setStatus: Function;
}

export default function Toggle({ status, setStatus }: ToggleProps) {
    return (
        <div
            onClick={() => setStatus(!status)}
            className={`w-6 h-4 rounded-full line-right with-transition cursor-pointer  ${
                status ? "bg-purple-700 " : "bg-purple-300"
            }`}
        >
            <div
                className={`with-transition bg-white w-3 h-3 rounded-full ${
                    status ? "-translate-x-[3px]" : "-translate-x-[0.6em]"
                }`}
            />
        </div>
    );
}
