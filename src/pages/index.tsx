import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { AiOutlineSearch } from "react-icons/ai";
import api from "../services/api";
import Header from "../components/Header";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import Background from "../components/Backround";
import RepoItem from "../components/RepoItem";
import Select from "../components/Select";
import { RefreshIcon } from "@heroicons/react/outline";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Toggle from "../components/Toggle";
import PlusCard from "../components/PlusCard";
import Radio from "../components/Radio";
import moment from "moment";

const Home: NextPage = () => {
    const user = "vimigueloli";
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [repositories, setRepositories] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searched, setSearched] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>({
        name: "Linguagem",
        id: "All",
    });
    const [licensed, setLicensed] = useState<boolean>(false);
    const [order, setOrder] = useState<boolean>(true);
    const [newSearchLoading, setNewSearchLoading] = useState<boolean>(false);
    const [created, setCreated] = useState<string>("2019-04-01");
    const [page, setPage] = useState<number>(1);
    const [loadingNew, setLoadingNew] = useState<boolean>(false);

    // ? make the initial get
    useEffect(() => {
        async function getUserData() {
            setLoading(true);
            try {
                const userResponse = await api.get(`users/${user}`);
                setUserData(userResponse.data);
                console.log("user->", userResponse.data);
                // * no search api          &sort=${selectedOrder.id
                const repositoriesResponse = await api.get(
                    `users/${user}/repos?per_page=10&page=${page}&sort=${
                        order ? "full_name" : "updated"
                    }`
                );
                setRepositories(repositoriesResponse.data);
                console.log("repositories->", repositoriesResponse.data);
                setLoading(false);
            } catch (e) {
                console.log("erro->", e);
                toast.error("falha ao carregar dados");
                setLoading(false);
            }
        }

        getUserData();
    }, []);

    // ? update get
    useEffect(() => {
        async function getRepositories() {
            setNewSearchLoading(true);
            try {
                const repositoriesResponse = await api.get(
                    `users/${user}/repos?per_page=10&page=${page}&sort=${
                        order ? "full_name" : "updated"
                    }`
                );
                setRepositories(repositoriesResponse.data);
                console.log("repositories->", repositoriesResponse.data);
                setNewSearchLoading(false);
            } catch (e) {
                console.log("erro->", e);
                toast.error("falha ao carregar dados");
                setNewSearchLoading(false);
            }
        }
        if (!searched) {
            getRepositories();
        }
    }, [order, searched]);

    // ? add the next page
    const addMore = async () => {
        if (!searched) {
            setLoadingNew(true);
            try {
                const response = await api.get(
                    `users/${user}/repos?per_page=10&page=${page + 1}&sort=${
                        order ? "full_name" : "updated"
                    }`
                );
                if (response.data.length > 1) {
                    setRepositories([...repositories, ...response.data]);
                    setPage(page + 1);
                } else {
                    setPage(-1);
                }
                setLoadingNew(false);
            } catch (e) {
                console.log(e);
                setLoadingNew(false);
            }
        }
    };

    // ? make a search
    async function onSearch(e: Event) {
        e.preventDefault();
        setSearched(true);
        const day = new Date(created);
        try {
            const response = await api.get(
                `search/repositories?q=${search}+user:${user}+language:${
                    selected.id
                }${licensed ? `+license:Mit` : ""}+created:>${moment(
                    day
                ).format("YYYY-MM-DD")}&per_page=100&page=1}`
            );
            setRepositories(response.data.items);
            setSearched(true);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Background>
            <Header />
            <div className="w-full h-full pt-16 overflow-y-auto overflow-x-clip line-center bg-gradient-to-tr ">
                <div
                    className={`w-full h-full st:w-11/12 st:h-5/6 bg-gray-700/80 st:rounded-lg shadow-md relative overflow-y-auto overflow-x-hidden`}
                >
                    <div className="w-full h-full overflow-y-auto overflow-x-clip">
                        {
                            // * loading user's data
                            loading && (
                                <div className={`h-full line-center `}>
                                    <ReactLoading
                                        type="spin"
                                        color="#5A278C"
                                        height={100}
                                        width={100}
                                    />
                                </div>
                            )
                        }
                        {
                            // * after loading user's data
                            !loading && (
                                <>
                                    {
                                        // * user's personal info
                                        <>
                                            <div className="line-center mt-8">
                                                <div className="p-[2px] bg-purple-300 rounded-full">
                                                    <div
                                                        className="bg-cover bg-center w-32 h-32 rounded-full"
                                                        style={{
                                                            backgroundImage: `url('https://github.com/${user}.png')`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="line-center mt-4">
                                                <div className="text-2xl font-extralight text-center text-purple-100">
                                                    {userData.name}
                                                </div>
                                            </div>
                                            <div className="line-center">
                                                <div className="text-center text-md text-purple-200 font-light mt-4 px-8 w-full st:w-3/4">
                                                    {userData.bio
                                                        ? userData.bio
                                                        : "Sem biografia"}
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        // * search and filters
                                        <>
                                            <form
                                                onSubmit={(e: any) =>
                                                    onSearch(e)
                                                }
                                            >
                                                <div className="line-center item-end h-12 cursor-pointer mx-4 gap-x-2 mt-8 flex-wrap gap-y-4 ">
                                                    <div className="line-right items-end w-full h-12 px-1 st:w-fit relative border-b border-purple-700">
                                                        <div className="line-center font-semibold h-8 w-8 mr-2 rounded-full text-purple-700 ">
                                                            <AiOutlineSearch size="1.5em" />
                                                        </div>
                                                        <input
                                                            className="input bg-transparent px-1 w-11/12 text-white placeholder:text-purple-800 font-light  h-8"
                                                            placeholder="Pesquisar ..."
                                                            value={search}
                                                            onChange={(e) =>
                                                                setSearch(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="w-full h-12 px-1 st:w-fit relative border-b border-purple-700">
                                                        <div className="text-xs text-purple-700 font-extralight">
                                                            Criado a partir de:
                                                        </div>
                                                        <input
                                                            className="input bg-transparent px-1 full text-white placeholder:text-purple-800 font-light  h-8"
                                                            type="date"
                                                            placeholder="Pesquisar ..."
                                                            value={created}
                                                            onChange={(e) =>
                                                                setCreated(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={`h-12 w-full st:w-40 line-center items-end`}
                                                    >
                                                        <Select
                                                            selected={selected}
                                                            changeSel={
                                                                setSelected
                                                            }
                                                            items={langs}
                                                        />
                                                    </div>
                                                    <div
                                                        className={`h-12 line-left items-end w-full st:w-24 text-sm text-white font-extralight`}
                                                    >
                                                        <div className="mb-1">
                                                            <Radio
                                                                status={
                                                                    licensed
                                                                }
                                                                changeStatus={
                                                                    setLicensed
                                                                }
                                                            />
                                                        </div>
                                                        <div className="ml-2">
                                                            Licenciado
                                                        </div>
                                                    </div>
                                                    <button
                                                        className={` bg-black/20 px-8 w-full st:w-fit text-md text-white rounded-md h-8 mt-4 border border-purple-700 button`}
                                                    >
                                                        Pesquisar
                                                    </button>
                                                    <div
                                                        onClick={() =>
                                                            setSearched(false)
                                                        }
                                                        className=" line-left w-24 text-red-500 h-12 hover:opacity-50 cursor-pointer items-end"
                                                    >
                                                        {
                                                            // * reset search
                                                            searched && (
                                                                <AiOutlineCloseCircle size="2em" />
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </form>
                                            {!searched && (
                                                <div className="line-left ml-12 mt-8">
                                                    <Toggle
                                                        status={order}
                                                        setStatus={setOrder}
                                                    />
                                                    <div
                                                        className={`
                                                        ml-2
                                                        text-xs
                                                        text-white font-extralight`}
                                                    >
                                                        {order
                                                            ? "Ordem Alfabética"
                                                            : "Alterados Recentemente"}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    }
                                    {
                                        // * loading repositories
                                        newSearchLoading && (
                                            <div
                                                className={`h-full line-center `}
                                            >
                                                <ReactLoading
                                                    type="spin"
                                                    color="#fff"
                                                    height={100}
                                                    width={100}
                                                />
                                            </div>
                                        )
                                    }
                                    {
                                        // * repository list
                                        !newSearchLoading && (
                                            <div className="mt-8 mb-24 line-evenly flex-wrap gap-x-4 gap-y-8 ">
                                                {
                                                    // * searching repositories
                                                    repositories.map((item) => (
                                                        <RepoItem
                                                            key={item.id}
                                                            name={item.name}
                                                            fork={
                                                                item.allow_forking
                                                            }
                                                            lang={item.language}
                                                            updated={
                                                                new Date(
                                                                    item.created_at
                                                                )
                                                            }
                                                            license={
                                                                item.license
                                                                    ? item
                                                                          .license
                                                                          .name
                                                                    : "Sem licença"
                                                            }
                                                        />
                                                    ))
                                                }
                                                {!loadingNew &&
                                                    !searched &&
                                                    page !== -1 && (
                                                        <PlusCard
                                                            action={addMore}
                                                        />
                                                    )}
                                                {loadingNew && (
                                                    <div className="w-64 line-center">
                                                        <ReactLoading
                                                            type="spin"
                                                            color="#5A278C"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </Background>
    );
};

const langs = [
    {
        name: "Todas",
        id: "All",
    },
    {
        name: "JavaScript",
        id: "JavaScript",
    },
    {
        name: "TypeScript",
        id: "TypeScript",
    },
    {
        name: "Python",
        id: "Python",
    },
    {
        name: "Java",
        id: "Java",
    },
    {
        name: "Jupyter_Notebook",
        id: "Jupyter_Notebook",
    },
    {
        name: "Html",
        id: "Html",
    },
    {
        name: "Css",
        id: "Css",
    },
];

export default Home;
