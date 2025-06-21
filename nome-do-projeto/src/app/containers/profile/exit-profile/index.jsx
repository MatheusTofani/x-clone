"use client";

import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
export default function ExitProfile() {

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push("/fead");
    };
    return (
        <div className="w-full h-[53px] px-[16px] flex items-center gap-[30px] sticky inset-0 bg-black/60 backdrop-blur-sm z-50 top-0 left-0">
            <div onClick={handleSubmit} className="text-[#E7E9EA] text-[20px] font-bold rounded-full hover:bg-[#71767b6e]  cursor-pointer p-2 transition-all duration-200 ">
                <FaArrowLeft />
            </div>
            <div className="flex flex-col">
                <h1 className="text-[#E7E9EA] text-[20px] font-bold ">Seu Nome</h1>
                <span className="text-[13px] text-[#71767b]">20 posts</span>
            </div>
        </div>
    );
}