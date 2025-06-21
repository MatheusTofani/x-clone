"use client";
import React from "react";

import useRegisterModal from "@/app/store/useRegisterStore";
import useLoginModal from "@/app/store/useLoginStore";


export default function Buttons() {
  const { open: openRegister } = useRegisterModal();
  const { open: openLogin } = useLoginModal();

  return (
    <>
      <div className="w-full max-w-[300px] sm:w-[300px] px-4 sm:px-0">
        <div>
          <button
            onClick={openRegister}
            className=" bg-[#1A8CD8] font-bold text-[#E7E9EA] w-full h-[40px] rounded-full my-4 cursor-pointer hover:bg-[#1267a0] transition duration-200"
          >
            Registrar
          </button>

          <p className="text-[#71767b] text-xs sm:text-[11px]">
            Ao se inscrever, você concorda com os Termos de Serviço e a Política de Privacidade, incluindo o Uso de Cookies.
          </p>
        </div>

        <div className="mt-12 sm:mt-[50px]">
          <h4 className="text-[17px] text-[#E7E9EA] font-bold mb-4">
            Já tem uma conta?
          </h4>
          <button
            onClick={openLogin}
            className=" text-[#1A8CD8] font-bold text-[15px] w-full h-[40px] rounded-full border border-[#71767b] cursor-pointer hover:bg-[#E7E9EA] hover:text-black transition duration-200"
          >
            Login
          </button>
        </div>
      </div>

   
    </>
  );
}
