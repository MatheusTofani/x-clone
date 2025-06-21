"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function ModalSenha({ userData }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { register, loading, error } = useAuthStore();

  const { email, name, birthDate } = userData || {};
  const [year, month, day] = birthDate?.split("-") || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      username,
      password,
      birth_day: parseInt(day),
      birth_month: parseInt(month),
      birth_year: parseInt(year),
    };

    const result = await register(data);

    if (result.success) {
      router.push("/fead");
    } else {
      alert("Erro: " + JSON.stringify(result.error));
    }
  };

  return (
    <div className="w-full top-0 h-screen bg-[#5b708366] fixed flex justify-center items-center z-50 px-4">
      <div className="w-full max-w-[600px] h-[90vh] sm:h-[650px] bg-black rounded-2xl overflow-y-auto">
        <header className="h-[53px] w-full px-[16px] flex items-center justify-center relative">
          <button className="absolute left-[16px] cursor-pointer p-1 rounded-full hover:bg-[#ffffff20] transition duration-300">
            <IoMdClose className="text-[#E7E9EA] text-[28px]" />
          </button>
          <FaXTwitter className="text-[#E7E9EA] text-[28px]" />
        </header>

        <div className="w-full px-6 sm:px-[80px]">
          <h1 className="text-[#E7E9EA] font-bold text-[26px] sm:text-[31px] mt-[20px]">Você precisará de uma senha</h1>
          <p className="text-gray-500 text-[14px]">É preciso ter 8 caracteres ou mais.</p>

          <form onSubmit={handleSubmit} className="flex flex-col mt-6 h-[440px] justify-between">
            <div className="relative w-full mt-6">
              <input
                type="password"
                id="password"
                placeholder=" "
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[64px] peer w-full px-3 pt-6 pb-2 text-[#E7E9EA] border border-gray-500 rounded-md outline-none focus:border-[#1A8CD8]"
              />
              <label
                htmlFor="password"
                className="cursor-text absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#1A8CD8] px-1"
              >
                Senha
              </label>
            </div>

            <div className="relative w-full mt-6">
              <input
                type="text"
                id="username"
                placeholder=" "
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-[64px] peer w-full px-3 pt-6 pb-2 text-[#E7E9EA] border border-gray-500 rounded-md outline-none focus:border-[#1A8CD8]"
              />
              <label
                htmlFor="username"
                className="cursor-text absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#1A8CD8] px-1"
              >
                Usuário
              </label>
            </div>

            <div>
              <p className="text-gray-500 text-[13px]">
                Ao se inscrever, você concorda com nossos Termos, com a Política de Privacidade e com o Uso de Cookies...
              </p>
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-[50px] bg-[#E7E9EA] text-black font-bold rounded-full mt-6 cursor-pointer hover:bg-[#71767b] transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Enviando..." : "Inscreva-se"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
