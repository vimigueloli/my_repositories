import React from "react";
import { AiFillGithub } from "react-icons/ai";

export default function Header() {
    return (
        <div className="line-center w-full h-16 text-purple-700 flex-col absolute">
            <AiFillGithub size="3em" />
            <div className=" w-full st:w-11/12 border-b mt-2 border-purple-700" />
        </div>
    );
}
