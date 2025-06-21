"use client";
import { useEffect, useState } from "react";
import axios from "@/app/services/api";
import Post from "../components/feed/post";
import { PostForm } from "../components/feed/postForm";

export default function FeedPage() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const res = await axios.get("posts/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(res.data);
        } catch (err) {
            console.error("Erro ao buscar posts:", err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <main className="w-full h-full flex items-center justify-center">
            <div className="w-[600px] min-h-screen border-x border-gray-600">
                <PostForm onPostSuccess={fetchPosts} />
                {posts.map((post) => (
                    <Post key={post.id} post={post}  onDelete={(id) => setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id))}/>
                ))}
            </div>
        </main>
    );
}
