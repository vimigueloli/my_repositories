import React from "react";
import { AiFillGithub } from "react-icons/ai";

export default function Header() {
    return (
        <div className="line-center w-full h-16 bg-slate-800 text-gray-900 absolute">
            <AiFillGithub size="3em" />
        </div>
    );
}
