import Post from "../components/fead/post";
import { PostForm } from "../components/fead/post-form";

export default function Fead() {
    return (
        <main className="w-full h-full flex items-center justify-center">
            <div className="w-[600px] min-h-screen border-x border-gray-600 ">
                <PostForm />
                <Post />
            </div>
        </main>
    );
}