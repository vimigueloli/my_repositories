import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/outline";

interface SelectProps {
    items: {
        name: string;
        id: string;
    }[];
    changeSel: Function;
    selected: { name: string; id: string };
    width?: string;
}

export default function Select({
    items,
    selected,
    changeSel,
    width = "st:w-36",
}: SelectProps) {
    const [open, setOpen] = useState(false);

    function handleChange(response: { name: string; id: string }) {
        changeSel(response);
        setOpen(!open);
    }

    const ref = useRef();

    // * fecha o select quando o usuário clicar fora dele
    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            //@ts-ignore
            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [open]);

    return (
        <div className={`relative w-full ${width} h-8`}>
            <input
                required
                autoComplete="off"
                id="combobox"
                type="text"
                value={selected ? selected.name : ""}
                onFocus={() => setOpen(true)}
                role="combobox"
                aria-controls="options"
                aria-expanded="false"
                className="w-full text-xs cursor-pointer text-white bg-transparent border-b border-purple-700 h-8 px-2 outline-none with-transition"
            />
            <ChevronDownIcon
                width={35}
                height={35}
                onClick={() => setOpen(!open)}
                className="text-purple-700 z-10 cursor-pointer absolute translate-y-[-0.2rem] inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            />
            <ul
                //@ts-ignore
                ref={ref}
                className={`${
                    open ? "block" : "hidden"
                } with-transition absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md border border-purple-700 bg-black/20 backdrop-blur py-1 text-base ring-2 ring-purple-700 ring-opacity-5 focus:outline-none sm:text-sm" id="options" role="listbox`}
            >
                {items.map((response) => {
                    return (
                        <li
                            key={response.id}
                            onClick={() => handleChange(response)}
                            id="option-0"
                            role="option"
                            tabIndex={-1}
                            className=" cursor-pointer font-extralight text-xs relative select-none py-2 pl-3 with-transition  text-white hover:text-purple-300"
                        >
                            <span className="block truncate">
                                {response.name}
                            </span>
                            {selected ? (
                                selected.name === response.name ? (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-6 text-purple-300">
                                        <CheckIcon width={20} height={20} />
                                    </span>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
