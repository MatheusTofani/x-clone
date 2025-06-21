"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/app/services/api";

import Post from "@/app/components/feed/post";
import ExitProfile from "@/app/components/profile/exitProfile";
import ProfileHeader from "@/app/components/profile/header";
import ProfileInfos from "@/app/components/profile/infos";

export default function ProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  // Busca perfil e posts
  const fetchProfile = async () => {
    try {
      // 1) busca dados do usuário (incluindo followers/ following)
      const res = await api.get(`/posts/users/${username}/info/`);
      setUser(res.data);

      // 2) busca os posts deste usuário
      const postsRes = await api.get(`/posts/users/${username}/posts/`);
      setPosts(postsRes.data);

      // 3) verifica se o perfil pertence ao usuário logado
      const token = localStorage.getItem("access_token");
      if (token) {
        const meRes = await api.get(`/accounts/profile/edit/`); // retorna dados de "me"
        const myUsername = meRes.data.username;
        setIsOwner(myUsername.toLowerCase() === username.toLowerCase());
      } else {
        setIsOwner(false);
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchProfile();
    }
  }, [username]);

  // Função para atualizar user data após follow/unfollow
  const handleFollowChangeFromChild = async () => {
    try {
      const res = await api.get(`/posts/users/${username}/info/`);
      setUser(res.data);
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
    }
  };

  if (!user) {
    return (
      <main className="w-full h-full flex items-center justify-center text-white">
        Carregando...
      </main>
    );
  }

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-[600px] min-h-screen border-x border-gray-600 relative">
        <ExitProfile
          name={user.first_name || user.username}
          postCount={posts.length}
        />
        <ProfileHeader />
        <div className="w-full h-auto px-[16px] pt-[12px]">
          <ProfileInfos
            name={user.first_name || user.username}
            username={user.username}
            bio={user.bio || "Este usuário ainda não adicionou uma bio."}
            followers={user.followers}
            following={user.following}
            isOwner={isOwner}
          />
        </div>

        <div className="w-full px-[16px] text-[15px] font-bold text-[#E7E9EA] h-[53px] flex items-center justify-center border-b border-[#71767b]">
          <div className="w-[53px] border-b-4 rounded border-[#1D9BF0] h-[53px] flex items-center justify-center">
            Posts
          </div>
        </div>

        {posts.length === 0 ? (
          <p className="text-[#71767b] text-center py-8">Nenhum post encontrado.</p>
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </div>
    </main>
  );
}
