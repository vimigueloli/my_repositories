import React from "react";
import { BsPlusCircleDotted } from "react-icons/bs";

interface PlusCardProps {
    action: Function;
}

export default function PlusCard({ action }: PlusCardProps) {
    return (
        <div
            className="w-64 shadow-md shadow-gray-700 p-2 h-40 border  cursor-pointer with-transition rounded-md relative
            text-purple-800 bg-black/20 border-purple-800 hover:bg-black/30 hover:text-purple-300 hover:border-purple-300"
            onClick={() => action()}
        >
            <div className="line-center h-full">
                <div>
                    <div className="line-center">
                        <BsPlusCircleDotted size="3.5em" />
                    </div>
                    <div className="text-white text-xs font-extralight mt-2">
                        Mostrar mais repositórios
                    </div>
                </div>
            </div>
        </div>
    );
}
