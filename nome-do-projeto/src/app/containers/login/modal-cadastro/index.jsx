"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import InputCount from "@/app/components/login/input-count";
import DateSelect from "@/app/components/login/date-select";

export function ModalLogin({ onNext, onClose }) {
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onNext({ email, name, birthDate });
    setLoading(false);
  };

  return (
    <div className="w-full top-0 h-screen bg-[#5b708366] fixed flex justify-center items-center z-50 px-4">
      <div className="w-full max-w-[600px] h-[90vh] sm:h-[650px] bg-black rounded-2xl overflow-y-auto">
        <header className="h-[53px] w-full px-[16px] flex items-center justify-center relative">
          <button
            onClick={onClose}
            className="absolute left-[16px] cursor-pointer p-1 rounded-full hover:bg-[#ffffff20] transition duration-300"
          >
            <IoMdClose className="text-[#E7E9EA] text-[28px]" />
          </button>
          <FaXTwitter className="text-[#E7E9EA] text-[28px]" />
        </header>

        <div className="w-full px-6 sm:px-[80px]">
          <h1 className="text-[#E7E9EA] font-bold text-[26px] sm:text-[31px] mt-[20px]">Criar sua conta</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputCount value={name} onChange={setName} />

            <div className="relative w-full mt-6">
              <input
                type="email"
                id="email"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[64px] peer w-full px-3 pt-6 pb-2 text-[#E7E9EA] border border-gray-500 rounded-md outline-none focus:border-[#1A8CD8]"
              />
              <label
                htmlFor="email"
                className="cursor-text absolute left-3 top-2 text-gray-500 text-sm transition-all
                  peer-placeholder-shown:top-5 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-500
                  peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#1A8CD8] px-1"
              >
                E-mail
              </label>
            </div>

            <div>
              <h2 className="text-[15px] font-bold mt-6 text-[#E7E9EA]">Data de nascimento</h2>
              <p className="text-[14px] mt-2 text-[#71767b]">
                Isso não será exibido publicamente. Confirme sua própria idade, mesmo se esta conta for de empresa, de um animal de estimação ou outros.
              </p>
            </div>

            <DateSelect value={birthDate} onChange={setBirthDate} />

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[50px] bg-[#E7E9EA] text-black font-bold rounded-full mt-6 cursor-pointer hover:bg-[#71767b] transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Carregando..." : "Avançar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
