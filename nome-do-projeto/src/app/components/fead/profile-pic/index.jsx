"use client";

import { useRouter } from "next/navigation";

export default function ProfilePic() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push("/profile");
    };
    return (
     <img onClick={handleSubmit} className="cursor-pointer h-[40px] w-[40px] rounded-full me-[8px]" src="/profile.png" />
    );
}