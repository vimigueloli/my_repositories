import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { AiOutlineSearch } from "react-icons/ai";
import api from "../services/api";
import Header from "../components/Header";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";

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
        <div className="w-screen h-screen relative">
            <Header />
            <div className="w-full h-full pt-16 overflow-y-auto overflow-x-clip line-center bg-gray-900 ">
                <div
                    className={`w-full h-full st:w-11/12 st:h-5/6 bg-slate-700 st:rounded-3xl shadow-md relative overflow-y-auto overflow-x-hidden`}
                >
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
                                <div className="line-center mt-8">
                                    <div className="p-1 bg-gray-900 rounded-full">
                                        <div
                                            className="bg-cover bg-center w-32 h-32 rounded-full"
                                            style={{
                                                backgroundImage: `url('https://github.com/${user}.png')`,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="line-center mt-4">
                                    <div className="text-2xl text-center text-gray-900">
                                        {userData.name}
                                    </div>
                                </div>
                                <div className="line-center">
                                    <div className="text-center text-lg text-gray-900 font-semibold mt-4 px-8 w-full st:w-3/4">
                                        {userData.bio
                                            ? userData.bio
                                            : "Sem biografia"}
                                    </div>
                                </div>
                                <div className="line-center mt-8">
                                    <form>
                                        <div className="line-right w-full px-2 st:px-0 st:w-96 relative">
                                            <input
                                                className="input bg-slate-100 px-4 w-11/12 rounded-full font-semibold shadow-md h-8"
                                                required
                                                placeholder="Pesquisar ..."
                                                value={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                            />
                                            <button className="bg-slate-100 line-center font-semibold h-8 w-8 ml-2 shadow-md rounded-full hover:bg-gray-800 hover:text-slate-100 ">
                                                <AiOutlineSearch size="1.5em" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="mt-8 mb-24">
                                    {
                                        // * searching repositories
                                        repositories.map((item) => (
                                            <div className="px-2 st:px-8 md:px-32">
                                                <div className="bg-slate-100 my-4 shadow-sm rounded-xl p-1 shadow-gray-900/80">
                                                    {item.name}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
