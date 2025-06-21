"use client";
import { useState, useEffect } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import FollowButton from "./FollowButton";
import EditProfileModal from "./editProfile";
import api from "@/app/services/api";

export default function ProfileInfos({
  name,
  username,
  bio,
  followers,
  following,
  isOwner,
  onFollowChange,
}) {
  const [followerCount, setFollowerCount] = useState(followers || 0);
  const [followingCount, setFollowingCount] = useState(following || 0);
  const [isEditing, setIsEditing] = useState(false); // ✅ Estado necessário para abrir o modal

  const fetchFollowCounts = async () => {
    try {
      const res = await api.get(`/follows/${username}/followers-count/`);
      setFollowerCount(res.data.followers);
      setFollowingCount(res.data.following);
      if (onFollowChange) onFollowChange(res.data);
    } catch (err) {
      console.error("Erro ao buscar contagens de seguidores:", err);
    }
  };

  useEffect(() => {
    if (username) fetchFollowCounts();
  }, [username]);

  useEffect(() => {
    if (typeof followers === "number") setFollowerCount(followers);
    if (typeof following === "number") setFollowingCount(following);
  }, [followers, following]);

  const handleFollowChange = async () => {
    await fetchFollowCounts();
  };

  return (
    <div className="w-full">
      <div className="text-end mb-[32px]">
        {isOwner ? (
          <>
            <button
              className="text-[#E7E9EA] h-[36px] w-[120px] border-[#71767b] border font-bold rounded-full hover:bg-[#ffffff20]"
              onClick={() => setIsEditing(true)}
            >
              Editar perfil
            </button>

            {isEditing && (
              <EditProfileModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                onSuccess={() => {
                  setIsEditing(false);
                  fetchFollowCounts();
                }}
              />
            )}
          </>
        ) : (
          <FollowButton
            profileUsername={username}
            onFollowChange={handleFollowChange}
          />
        )}
      </div>

      <div className="h-[160px] flex flex-col gap-[10px]">
        <div>
          <h1 className="text-[#E7E9EA] font-bold text-[20px]">{name}</h1>
          <h2 className="text-[#71767b] text-[15px]">@{username}</h2>
        </div>
        <div className="text-[#E7E9EA] text-[15px]">{bio}</div>
        <div className="flex items-center gap-[3px]">
          <IoCalendarOutline className="text-[17px] text-[#71767b]" />
          <span className="text-[15px] text-[#71767b]">
            Ingressou em setembro de 2023
          </span>
        </div>
        <div className="flex gap-5">
          <div className="flex gap-1">
            <span className="text-[#E7E9EA] text-[15px] font-bold">
              {followingCount}
            </span>
            <p className="text-[15px] text-[#71767b]">Seguindo</p>
          </div>

          <div className="flex gap-1">
            <span className="text-[#E7E9EA] text-[15px] font-bold">
              {followerCount}
            </span>
            <p className="text-[15px] text-[#71767b]">Seguidores</p>
          </div>
        </div>
      </div>
    </div>
  );
}
