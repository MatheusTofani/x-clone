import { FaXTwitter } from "react-icons/fa6";
import React from "react";
import FooterLogin from "./containers/login/footer-login";
import FormLogin from "./containers/login/form-login";
import ModalController from "./containers/login/modal-controller";

export default function Home() {
  return (
    <div
      className="
        flex items-center h-screen
        flex-col space-y-8 p-4
        sm:flex-row sm:space-y-0 sm:p-0
      "
      style={{ minWidth: '100vw' }}
    >

      <h1
        className="
          text-[#E7E9EA]
          text-[80px] sm:text-[380px]
          w-full sm:w-[50%]
          flex justify-center
          select-none
        "
      >
        <FaXTwitter />
      </h1>

      <div className="
    flex items-center h-screen justify-center
    flex-col space-y-8 p-4
    sm:items-start sm:p-0
  ">
        <h2 className="text-[#E7E9EA] font-bold mb-12 text-3xl sm:text-[63px]">
          Acontecendo agora
        </h2>

        <FormLogin />
      </div>

      <FooterLogin />
      <ModalController />
    </div>
  );
}
