"use client";
import { useState } from "react";
import axios from "@/app/services/api";
import ProfilePic from "./profilePic";

export function PostForm({ onPostSuccess }) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        try {
            setLoading(true);
            const token = localStorage.getItem("access_token");

            await axios.post(
                "posts/",
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setContent("");
            onPostSuccess?.(); // chama a função passada como prop
        } catch (err) {
            console.error("Erro ao postar:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full h-[116px] px-[16px] border-b border-gray-600"
        >
            <div className="pt-[16px] flex items-center">
                <ProfilePic />
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="h-[52px] py-[12px] w-full text-[#E7E9EA] text-[20px] outline-none bg-transparent"
                    placeholder="O que está acontecendo?"
                />
            </div>
            <div className="w-full flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-[80px] h-[35px] bg-[#E7E9EA] text-black rounded-full font-bold cursor-pointer disabled:opacity-50"
                >
                    {loading ? "Postando..." : "Postar"}
                </button>
            </div>
        </form>
    );
}
