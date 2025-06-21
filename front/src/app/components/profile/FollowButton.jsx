"use client";
import { useState, useEffect } from "react";
import api from "@/app/services/api";

export default function FollowButton({ profileUsername, onFollowChange }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Verifica estado inicial
  useEffect(() => {
    if (!profileUsername) return;
    const checkFollowing = async () => {
      try {
        const res = await api.get(`/follows/${profileUsername}/is-following/`);
        setIsFollowing(res.data.is_following);
      } catch (err) {
        console.error("Erro ao verificar se está seguindo:", err);
      }
    };
    checkFollowing();
  }, [profileUsername]);

  const handleClick = async () => {
    if (!profileUsername) return;
    setLoading(true);
    try {
      if (isFollowing) {
        await api.delete(`/follows/${profileUsername}/`);
        setIsFollowing(false);
        if (onFollowChange) onFollowChange(false);
      } else {
        await api.post(`/follows/${profileUsername}/`, {});
        setIsFollowing(true);
        if (onFollowChange) onFollowChange(true);
      }
    } catch (err) {
      console.error("Erro ao seguir/desseguir:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`text-[#E7E9EA] h-[36px] w-[120px] border-[#71767b] border font-bold rounded-full transition duration-200 ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#ffffff20]"
      }`}
    >
      {loading ? "..." : isFollowing ? "Deixar de seguir" : "Seguir"}
    </button>
  );
}
