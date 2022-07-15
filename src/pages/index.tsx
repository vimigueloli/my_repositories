import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { AiOutlineSearch } from "react-icons/ai";
import api from "../services/api";
import Header from "../components/Header";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import Background from "../components/Backround";
import RepoItem from "../components/RepoItem";

const Home: NextPage = () => {
    const user = "vimigueloli";
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [repositories, setRepositories] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        async function getUserData() {
            setLoading(true);
            try {
                const userResponse = await api.get(`users/${user}`);
                setUserData(userResponse.data);
                console.log("user->", userResponse.data);
                const repositoriesResponse = await api.get(
                    `users/${user}/repos?per_page=100`
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
                                        color="#fff"
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
                                            <div className="line-center gap-x-2 mt-8">
                                                <form>
                                                    <div className="line-right w-full px-1 st:w-fit relative border-b border-purple-700">
                                                        <input
                                                            className="input bg-transparent px-1 w-11/12 text-white placeholder:text-purple-800 font-light  h-8"
                                                            required
                                                            placeholder="Pesquisar ..."
                                                            value={search}
                                                            onChange={(e) =>
                                                                setSearch(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <button className="line-center font-semibold h-8 w-8 ml-2 rounded-full hover:text-purple-300 text-purple-800 ">
                                                            <AiOutlineSearch size="1.5em" />
                                                        </button>
                                                    </div>
                                                </form>
                                                <div>select filtros</div>
                                                <div>select order</div>
                                            </div>
                                        </>
                                    }
                                    {
                                        // * repository list
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
                                                                item.updated_at
                                                            )
                                                        }
                                                        license={
                                                            item.license
                                                                ? item.license
                                                                      .name
                                                                : "Sem licença"
                                                        }
                                                    />
                                                ))
                                            }
                                        </div>
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

export default Home;
