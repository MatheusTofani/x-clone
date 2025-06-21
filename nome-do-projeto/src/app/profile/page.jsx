import ExitProfile from "../containers/profile/exit-profile";
import ProfileHeader from "../containers/profile/header-profile";
import ProfileInfos from "../containers/profile/profile-infos";
import Post from "../components/fead/post";
export default function Profile() {
    return (
        <main className="w-full h-full flex items-center justify-center">
            <div className=" w-[600px] min-h-screen border-x border-gray-600 relative">
                <ExitProfile />
                <ProfileHeader />
                <div className="w-full h-auto px-[16px] pt-[12px]">
                    <ProfileInfos />
                </div>
                <div className="w-full px-[16px] text-[15px] font-bold text-[#E7E9EA]  h-[53px] flex items-center justify-center  border-b border-[#71767b]">
                    <div className="w-[53px] border-b-5 rounded border-[#1D9BF0] h-[53px] flex items-center justify-center ">
                        Posts
                    </div>
                  
                </div>
                  <Post />
            </div>

        </main>
    )
}