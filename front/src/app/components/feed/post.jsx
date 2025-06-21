"use client";
import { useState } from "react";
import { FaRegHeart, FaHeart, FaTrash } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import ProfilePic from "./profilePic";
import axios from "@/app/services/api"; 

export default function Post({ post, onDelete }) {
  const [liked, setLiked] = useState(post.is_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.delete(`posts/${post.id}/like/`);
        setLikesCount((prev) => prev - 1);
      } else {
        await axios.post(`posts/${post.id}/like/`);
        setLikesCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Erro ao curtir/descurtir post:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza que deseja apagar este post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`posts/${post.id}/`);
      if (onDelete) onDelete(post.id); 
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  return (
    <article className="w-full h-auto px-[16px] border-b border-gray-600 pt-[16px]">
      <div className="flex">
        <ProfilePic username={post.user.username} />
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex">
              <h2 className="text-[15px] text-[#E7E9EA] font-bold me-[5px]">
                {post.user.first_name || post.user.username}
              </h2>
              <div className="flex text-[#71767B] text-[15px]">
                <h3>@{post.user.username}</h3>
                <span className="px-[4px] font-bold">·</span>
                <span>{new Date(post.created_at).toLocaleTimeString()}</span>
              </div>
            </div>

           
            {post.is_owner && (
              <button onClick={handleDelete} title="Apagar post">
                <FaTrash className="text-red-500 hover:text-red-700" />
              </button>
            )}
          </div>

          <p className="text-[#E7E9EA] text-[15px] mt-1">{post.content}</p>

          <div className="w-full flex gap-[100px] py-[12px]">
            <div className="flex items-center text-[#71767B] gap-[4px]">
              <AiOutlineRetweet className="text-[16px]" />
              <span className="text-[13px]">{post.retweet_post ? 1 : 0}</span>
            </div>

            <div
              onClick={handleLike}
              className="flex items-center gap-[4px] cursor-pointer transition hover:text-pink-500"
            >
              {liked ? (
                <FaHeart className="text-pink-500 text-[16px]" />
              ) : (
                <FaRegHeart className="text-[16px] text-[#71767B]" />
              )}
              <span className="text-[13px] text-[#71767B]">{likesCount}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
