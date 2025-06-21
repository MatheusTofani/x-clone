import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import ProfilePic from "../profile-pic";

export default function Post() {
    return (
        <article className="w-full h-auto px-[16px] border-b border-gray-600 pt-[16px]">
            <div className="flex">
               <ProfilePic />
                <div>
                    <div className="flex ">
                        <h2 className="text-[15px] text-[#E7E9EA] font-bold me-[5px]">Seu nome</h2>
                        <div className=" flex text-[#71767B] text-[15px] ">
                            <h3>@seuUsuario</h3>
                            <span className="px-[4px] font-bold">·</span>
                            <span>13m</span>
                        </div>
                    </div>
                    <p className="text-[#E7E9EA] text-[15px] ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt in enim et quis maxime tenetur rerum sint, maiores aspernatur explicabo pariatur dolores neque vitae cumque quae ipsa inventore ad consequatur.</p>
                    <div className="w-full flex gap-[100px] py-[12px]">

                        <div className="flex items-center text-[#71767B] gap-[4px]">
                            <AiOutlineRetweet className=" text-[16px]" />
                             <span className="text-[13px]">15</span>
                        </div>

                        <div className="flex items-center text-[#71767B] gap-[4px]">
                            <FaRegHeart className="text-[16px]" />
                            <span className="text-[13px]">15</span>
                        </div>


                    </div>

                </div>
            </div>
        </article>
    )
}