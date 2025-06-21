import ProfilePic from "../profile-pic";

export function PostForm() {
    return (
        <form className="w-full h-[116px] px-[16px] border-b border-gray-600">
            <div className="pt-[16px] flex items-center flex ">
               <ProfilePic />
                <input type="text" className="h-[52px] py-[12px] w-full text-[#E7E9EA] text-[20px] outline-none" placeholder="O que está acontecendo?" />
            </div>
            <div className="w-full flex justify-end">
            <button  className="w-[80px] h-[35px] bg-[#E7E9EA] rounded-full font-bold cursor-pointer">Postar</button>
            </div>
        </form>
    );
}