"use client";
import React, { useState } from "react";
import axios from "@/app/services/api.js";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/store/useLoginStore";
import { IoMdClose } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

export default function LoginModal() {
    const { isOpen, close } = useLoginModal();
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const loginRes = await axios.post("accounts/login/", formData);

            const { access, refresh } = loginRes.data;
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            router.push("/feed");
        } catch (err) {
            setError(err.response?.data || "Erro ao fazer login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full top-0 h-screen bg-[#5b708366] fixed flex justify-center items-center z-50 px-4">
            <div className="w-full max-w-[600px] h-[90vh] sm:h-[650px] bg-black rounded-2xl overflow-y-auto">
                <header className="h-[53px] w-full px-[16px] flex items-center justify-center relative">
                    <button
                        className="absolute left-[16px] cursor-pointer p-1 rounded-full hover:bg-[#ffffff20] transition duration-300"
                        onClick={() => {
                            close();
                        }}
                        aria-label="Fechar modal"
                    >
                        <IoMdClose className="text-[#E7E9EA] text-[28px]" />
                    </button>
                    <FaXTwitter className="text-[#E7E9EA] text-[28px]" />
                </header>
                <div className="w-full px-6 sm:px-[80px]">
                    <h2 className="text-[#E7E9EA] font-bold text-[26px] sm:text-[31px] mt-[20px]">Entrar no X</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col mt-6 h-[440px] justify-between">
                        <div>
                            <div className="relative w-full mt-6">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder=" "
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="h-[64px] peer w-full px-3 pt-6 pb-2 text-[#E7E9EA] border border-gray-500 rounded-md outline-none focus:border-[#1A8CD8]"
                                    required
                                />
                                <label
                                    htmlFor="username"
                                    className="cursor-text absolute left-3 top-2 text-gray-500 text-sm transition-all
                      peer-placeholder-shown:top-5 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-500
                      peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#1A8CD8] px-1"
                                >Usuário</label>
                            </div>
                            <div className="relative w-full mt-6">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder=" "
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="h-[64px] peer w-full px-3 pt-6 pb-2 text-[#E7E9EA] border border-gray-500 rounded-md outline-none focus:border-[#1A8CD8]"
                                    required
                                />
                                <label
                                    htmlFor="password"
                                    className="cursor-text absolute left-3 top-2 text-gray-500 text-sm transition-all
                      peer-placeholder-shown:top-5 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-500
                      peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#1A8CD8] px-1"
                                >Senha</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-[50px] bg-[#E7E9EA] text-black font-bold rounded-full mt-6 cursor-pointer hover:bg-[#71767b] transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                        {error && (
                            <p className="text-red-600 text-center mt-2">
                                {typeof error === "string" ? error : JSON.stringify(error)}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
