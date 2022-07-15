import React from "react";
import { RiGitRepositoryLine } from "react-icons/ri";
import { BiGitRepoForked } from "react-icons/bi";
import { DiJava, DiPython, DiCss3, DiHtml5 } from "react-icons/di";
import { SiJavascript, SiTypescript } from "react-icons/si";
import { BsQuestionDiamondFill, BsClockHistory } from "react-icons/bs";

interface RepoItemProps {
    name: string;
    fork: boolean;
    lang: string;
    updated: Date;
    license: string;
}

export default function RepoItem({
    name,
    fork,
    lang = "",
    updated,
    license = "",
}: RepoItemProps) {
    return (
        <div
            className="w-64 shadow-md shadow-gray-700 p-2 h-40 border  cursor-pointer with-transition rounded-md relative
            text-purple-800 bg-black/20 border-purple-800 hover:bg-black/30 hover:text-purple-300 hover:border-purple-300"
        >
            {
                // * fork
                <div className="w-full h-full p-2 absolute items-end line-right -translate-x-2 ">
                    <p
                        className={`text-xs pb-1 line-left ${
                            fork ? "" : "text-gray-500"
                        }`}
                    >
                        <BiGitRepoForked size="0.7em" className="mr-1" />
                        {fork ? "fork permitido" : "fork não permitido"}
                    </p>
                </div>
            }
            {
                // * repository name
                <div className="line-left gap-x-2 pr-2 items-start ">
                    <RiGitRepositoryLine size="1.2em" />
                    <div className="line-left font-light text-purple-100">
                        {name}
                    </div>
                </div>
            }
            {
                // * language
                <div className="mt-4 text-sm text-purple-100 line-left">
                    {lang !== null &&
                    lang !== undefined &&
                    lang !== "" &&
                    lang === "JavaScript" ? (
                        <SiJavascript
                            size="0.8em"
                            className="mr-2 text-yellow-500 ml-1"
                        />
                    ) : lang === "TypeScript" ? (
                        <SiTypescript
                            size="0.8em"
                            className="mr-2 text-blue-500 ml-1"
                        />
                    ) : lang === "Java" ? (
                        <DiJava size="1.5em" className="mr-2 text-red-500 " />
                    ) : lang === "Python" ? (
                        <DiPython
                            size="1.2em"
                            className="mr-2 text-yellow-300"
                        />
                    ) : lang === "HTML" ? (
                        <DiHtml5
                            size="1.2em"
                            className="mr-2 text-orange-600"
                        />
                    ) : lang === "Jupyter Notebook" ? (
                        <DiPython
                            size="1.2em"
                            className="mr-2 text-yellow-300"
                        />
                    ) : lang === "CSS" ? (
                        <DiCss3 size="1.2em" className="mr-2 text-blue-600 " />
                    ) : lang !== "" ? (
                        <BsQuestionDiamondFill
                            size="1em"
                            className="mr-2 ml-1"
                        />
                    ) : null}
                    {lang ? lang : "linguagem não informada"}
                </div>
            }
            {
                // * updated at
                <div className="line-left mt-4">
                    {updated && (
                        <div className="text-sm text-purple-100 font-light line-left">
                            <BsClockHistory
                                size="0.8em"
                                className="mx-1 mr-2"
                            />
                            {updated.getDate()}/{updated.getMonth() + 1}/
                            {updated.getFullYear()}
                        </div>
                    )}
                </div>
            }
            {
                // * license
                <div className="mt-4">
                    {license && (
                        <div className="text-xs text-purple-100 font-light line-left">
                            <div
                                className={`w-2 h-2 rounded-full mx-1 mr-2 shadow ${
                                    license !== "Sem licença"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                            />
                            {license}
                        </div>
                    )}
                </div>
            }
        </div>
    );
}
