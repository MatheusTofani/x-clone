import { IoCalendarOutline } from "react-icons/io5";

export default function ProfileInfos() {
    return (
        <div className="w-full ">
            <div className="text-end mb-[32px]">
                <button className="text-[#E7E9EA] h-[36px] w-[120px] border-[#71767b] border font-bold rounded-full">Editar perfil</button>
            </div>
            <div className="h-[160px] flex flex-col gap-[10px]">
                <div >
                    <h1 className="text-[#E7E9EA] font-bold text-[20px]">Seu Nome</h1>
                    <h2 className="text-[#71767b]  text-[15px] ">@seuNome</h2>
                </div>
                <div className="text-[#E7E9EA]  text-[15px]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="flex items-center gap-[3px]">
                    <IoCalendarOutline className="text-[17px] text-[#71767b] " />
                    <span className="text-[15px] text-[#71767b]">Ingressou em setembro de 2023</span>
                </div>
                <div className="flex gap-5">
                    <div className="flex gap-1">
                        <span className="text-[#E7E9EA]  text-[15px] font-bold">61</span>
                        <p className="text-[15px] text-[#71767b]">Seguidores</p>
                    </div>

                    <div className="flex gap-1">
                        <span  className="text-[#E7E9EA]  text-[15px] font-bold">61</span>
                        <p className="text-[15px] text-[#71767b]">Seguindo</p>
                    </div>
                </div>
            </div>
        </div>
    )
}