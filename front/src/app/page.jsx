import Buttons from "./components/login/buttons";
import { FaXTwitter } from "react-icons/fa6";
import FooterLogin from "./components/start/footer";
import RegisterModal from "./components/login/RegisterModal";
import LoginModal from "./components/login/LoginModal";
export default function Home() {
  return (
    <div className="flex items-center h-screen flex-col space-y-8 p-4 sm:flex-row sm:space-y-0 sm:p-0">
      <h1
        className=" text-[#E7E9EA] text-[80px] sm:text-[380px]  w-full sm:w-[50%] flex justify-center select-none ">
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

        <Buttons />
      </div>

      <FooterLogin />
      <RegisterModal />
      <LoginModal />
    </div>
  );
}
