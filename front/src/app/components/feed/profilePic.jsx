"use client";
import { useRouter } from "next/navigation";

export default function ProfilePic({ username, src = "/profile.png" }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/profile/${username}`);
  };

  return (
    <img
      onClick={handleClick}
      className="cursor-pointer h-[40px] w-[40px] rounded-full me-[8px]"
      src={src}
      alt="Foto de perfil"
    />
  );
}
