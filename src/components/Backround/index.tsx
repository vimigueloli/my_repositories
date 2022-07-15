import React from "react";
import code from "../../public/assets/code_bg.png";

interface BackroundProps {
    children: React.ReactNode;
}

export default function Background({ children }: BackroundProps) {
    return (
        <div className="w-screen h-screen bg-gray-700 relative overflow-hidden">
            <div className="line-right w-full mt-12 pr-8 absolute">
                <div className="w-72 h-72 bg-purple-700 blur-3xl opacity-20 rounded-full" />
            </div>
            <div className="line-left mt-16 w-full absolute">
                <div
                    className="w-64 h-64 bg-cover mx-15 ml-16 opacity-30 blur-sm"
                    style={{ backgroundImage: `url(${code.src})` }}
                >
                    a
                </div>
            </div>
            <div className="line-right w-full mt-56 pt-12 absolute">
                <div
                    className="w-64 h-64 bg-cover  opacity-30 blur-sm"
                    style={{ backgroundImage: `url(${code.src})` }}
                >
                    a
                </div>
            </div>
            <div className="line-left w-full mt-96 ml-16 pt-24 absolute">
                <div
                    className="w-64 h-64 bg-cover  opacity-30 blur-sm"
                    style={{ backgroundImage: `url(${code.src})` }}
                >
                    a
                </div>
            </div>
            <div className="line-left w-full h-full items-end absolute">
                <div className="w-72 h-72 bg-purple-800 blur-3xl opacity-30 rounded-full" />
            </div>
            <div className="w-full h-full">{children}</div>
        </div>
    );
}
